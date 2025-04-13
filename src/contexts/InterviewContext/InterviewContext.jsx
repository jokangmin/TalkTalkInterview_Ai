import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const InterviewContext = createContext();

const InterviewProvider = ({ children }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [interviewQuestions, setInterviewQuestions] = useState([]); // 질문 목록 상태
    const [userAnswer, setUserAnswer] = useState("");
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [askedQuestions, setAskedQuestions] = useState([]);
    const [feedbackHistory, setFeedbackHistory] = useState([]);
    const [answerHistory, setAnswerHistory] = useState([]);
    const apiKey = import.meta.env.VITE_GPT_API_KEY;

    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        await handleSubmitAnswer();
        setIsLoading(false);
    };

    const handleConfirm = async () => {
        if (selectedCategory && jobTitle.trim() !== '') {
            setIsConfirmed(true);
            await fetchInterviewQuestions(selectedCategory, jobTitle); // 질문 생성
        } else {
            alert("카테고리와 직무를 모두 입력해주세요.");
        }
    };

    const fetchInterviewQuestions = async (category, job) => {
        try {
            setIsLoading(true);
            let prompt = "";
            if(category === "기술 면접"){
                prompt = `당신은 면접 질문을 만들어주는 시스템입니다. 카테고리는 "${category}", 직무는 "${job}"입니다. 이 조건에 맞는 직무에 맞는 전문성 있는 면접 질문(사용 기술 등) 10개를 bullet 없이 순수한 질문 문장만 배열 형식 없이 줄 단위로 나열해 주세요.`;
            }
            if(category === "인성 면접"){
                prompt = `당신은 면접 질문을 만들어주는 시스템입니다. 카테고리는 "${category}", 직무는 "${job}"입니다. 이 조건에 맞는 직무에 맞는 인성과 상황 판단 능력을 확인하기위한 질문 10개를 bullet 없이 순수한 질문 문장만 배열 형식 없이 줄 단위로 나열해 주세요.`;
            }
            if(category === "컬처핏 면접"){
                prompt = `당신은 면접 질문을 만들어주는 시스템입니다. 카테고리는 "${category}", 직무는 "${job}"입니다. 이 조건에 맞는 직무와 회사에 맞는 컬쳐핏 적성 면접 질문 10개를 bullet 없이 순수한 질문 문장만 배열 형식 없이 줄 단위로 나열해 주세요.`;
            }
            
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "당신은 면접 질문을 생성하는 도우미입니다." },
                        { role: "user", content: prompt }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            const questionsText = response.data.choices[0].message.content;
            const questions = questionsText.split("\n").filter(q => q.trim() !== "");
            setInterviewQuestions(questions);

            const firstQuestion = getRandomQuestion(questions, []);
            setQuestionIndex(questions.indexOf(firstQuestion));
            setAskedQuestions([firstQuestion]);
        } catch (error) {
            console.error("질문 생성 실패:", error);
            alert("면접 질문을 생성하는 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitAnswer = async () => {
        if (userAnswer.trim()) {
            setAnswer(userAnswer);
            setAnswerHistory((prev) => [...prev, userAnswer]);
            setIsAnswerSubmitted(true);

            await handleFeedback(userAnswer);
            handleNextQuestion();
        } else {
            alert("답변을 입력해주세요.");
        }
    };

    const handleFeedback = async (userAnswer) => {
        if (!userAnswer.trim()) {
            setFeedback("답변을 입력해주세요.");
            return;
        }

        const currentQuestion = interviewQuestions[questionIndex];

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "당신은 면접관입니다. 사용자의 답변에 대한 피드백을 조건에 맞게 작성해주세요." },
                        { role: "system", content: "피드백의 초반은 질문에 대해 사용자의 답변이 어떠한 지 분석해 피드백\n중후반은 사용자의 답변에서 태도와 말투를 분석해서 피드백\n문단별로 줄바꿈 하며 출력한다." },
                        { role: "user", content: `1. 면접관의 질문: ${currentQuestion}\n2. 사용자의 답변: ${userAnswer}\n3. 피드백 어조: 차분하고 지적인 말투\n4. 피드백 목적: 사용자가 면접에 대한 피드백을 얻기 위함` }
                    ],
                    max_tokens: 1500,
                    temperature: 0.8
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = response.data.choices[0].message.content;
            setFeedback(result);
            setFeedbackHistory((prev) => [...prev, result]);
        } catch (error) {
            console.error("피드백 오류:", error);
            setFeedback("피드백을 가져오는 중 오류가 발생했습니다.");
        }
    };

    const getRandomQuestion = (questions, asked) => {
        const remaining = questions.filter(q => !asked.includes(q));
        if (remaining.length === 0) return questions[Math.floor(Math.random() * questions.length)];
        return remaining[Math.floor(Math.random() * remaining.length)];
    };

    const handleNextQuestion = () => {
        const next = getRandomQuestion(interviewQuestions, askedQuestions);
        setQuestionIndex(interviewQuestions.indexOf(next));
        setAskedQuestions(prev => [...prev, next]);
        setUserAnswer("");
        setAnswer("");
        setFeedback("");
        setIsAnswerSubmitted(false);
    };

    const handleSaveQuestion = async (questionText, answer, feedbackText) => {
        try {
            const token = localStorage.getItem('authToken');
            const payload = JSON.parse(atob(token.split('.')[1]));
            const memberId = payload.id;
            if (!token || !memberId) {
                alert("로그인이 필요합니다.");
                return;
            }

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/favorite`, {
                memberId,
                interviewQ: questionText,
                answer,
                feedback: feedbackText
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert("나의 질문에 저장되었습니다!");
        } catch (error) {
            console.error("질문 저장 실패:", error);
            alert("질문 저장 중 오류가 발생했습니다.");
        }
    };

    return (
        <InterviewContext.Provider value={{
            question: interviewQuestions[questionIndex] || "",
            userAnswer,
            setUserAnswer,
            answer,
            feedback,
            isAnswerSubmitted,
            handleSubmitAnswer,
            askedQuestions,
            feedbackHistory,
            answerHistory,
            handleSaveQuestion,
            handleSubmit,
            handleConfirm,
            setSelectedCategory,
            selectedCategory,
            setJobTitle,
            jobTitle,
            isLoading,
            isConfirmed
        }}>
            {children}
        </InterviewContext.Provider>
    );
};

export default InterviewProvider;
