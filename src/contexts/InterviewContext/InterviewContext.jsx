import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
import { PATH } from '../../../scripts/path';

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
    // ✅ 면접이 완전히 끝났는지 여부를 나타내는 새로운 상태
    const [isInterviewFinished, setIsInterviewFinished] = useState(false); 

    // ✅ 초기 상태를 저장하여 '다시 하기' 시 활용
    const [initialCategory, setInitialCategory] = useState('');
    const [initialJobTitle, setInitialJobTitle] = useState('');


    const handleSubmit = async () => {
        setIsLoading(true);
        await handleSubmitAnswer();
        setIsLoading(false);
    };

    const handleConfirm = async () => {
        if (selectedCategory && jobTitle.trim() !== '') {
            setIsConfirmed(true);
            // ✅ 초기 값 저장
            setInitialCategory(selectedCategory);
            setInitialJobTitle(jobTitle);
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
                prompt = `당신은 면접 질문을 만들어주는 시스템입니다. 카테고리는 "${category}", 직무는 "${job}"입니다. 이 조건에 맞는 직무에 맞는 전문성 있는 면접 질문(사용 기술 등) 10개를 어떤 불렛(bullet)이나 숫자 목록(numbered list) 없이, 순수한 질문 문장만 각 질문 당 한 줄로 나열해 주세요.`;
            }
            if(category === "인성 면접"){
                prompt = `당신은 면접 질문을 만들어주는 시스템입니다. 카테고리는 "${category}", 직무는 "${job}"입니다. 이 조건에 맞는 직무에 맞는 인성과 상황 판단 능력을 확인하기위한 질문 10개를 어떤 불렛(bullet)이나 숫자 목록(numbered list) 없이, 순수한 질문 문장만 각 질문 당 한 줄로 나열해 주세요.`;
            }
            if(category === "컬처핏 면접"){
                prompt = `당신은 면접 질문을 만들어주는 시스템입니다. 카테고리는 "${category}", 직무는 "${job}"입니다. 이 조건에 맞는 직무와 회사에 맞는 컬쳐핏 적성 면접 질문 10개를 어떤 불렛(bullet)이나 숫자 목록(numbered list) 없이, 순수한 질문 문장만 각 질문 당 한 줄로 나열해 주세요.`;
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

            if (askedQuestions.length >= interviewQuestions.length -1) {
                setIsInterviewFinished(true);
            } else {
                handleNextQuestion();
            }
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
                        {
                            role: "system",
                            content: `당신은 차분하고 지적인 면접관입니다. 사용자의 답변에 대해 피드백을 줄 때 다음 기준을 따르세요:
    1. 첫 문단에서는 질문에 대한 답변의 **내용의 충실도, 구체성, 적절성**을 분석해 피드백하세요.
    2. 두 번째 문단에서는 사용자의 **말투, 태도, 논리 전개 방식**을 바탕으로 커뮤니케이션 능력에 대한 피드백을 주세요.
    3. 각 문단은 **줄바꿈**을 하여 나누고, **구체적인 예시나 개선 포인트**를 포함하세요.
    4. 절대로 칭찬만 반복하지 말고, **도움이 되는 방향으로 피드백**을 구성하세요.
    `
                        },
                        {
                            role: "user",
                            content: `면접 질문: ${currentQuestion}\n사용자 답변: ${userAnswer}`
                        }
                    ],
                    max_tokens: 1500,
                    temperature: 0.6,
                    top_p: 0.9,
                    presence_penalty: 0.6
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
        if (remaining.length === 0) {
            return null; // 남은 질문이 없으면 null 반환
        }
        return remaining[Math.floor(Math.random() * remaining.length)];
    };

    const handleNextQuestion = () => {
        const next = getRandomQuestion(interviewQuestions, askedQuestions);
        
        if (!next) { // 더 이상 질문이 없으면 면접 종료 상태로 설정
            setIsInterviewFinished(true);
            return;
        }

        setQuestionIndex(interviewQuestions.indexOf(next));
        setAskedQuestions(prev => [...prev, next]);
        setUserAnswer("");
        setAnswer(""); // 현재 답변 초기화
        setFeedback(""); // 현재 피드백 초기화
        setIsAnswerSubmitted(false);
    };

    const handleSaveQuestion = async (questionText, answerToSave, feedbackTextToSave, selectedCategory, jobTitle) => {
        if (answerToSave.length > 5000) {
            alert('답변이 너무 깁니다. 5000자 이하로 작성해주세요.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }
            const payload = JSON.parse(atob(token.split('.')[1]));
            const memberId = payload.id;
            if (!memberId) {
                alert("로그인이 필요합니다.");
                return;
            }

            await axios.post(`${PATH.SERVER}/api/user/favorite`, {
                memberId,
                interviewQ: questionText,
                answer: answerToSave,
                feedback: feedbackTextToSave,
                category: selectedCategory,
                jobTitle
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert("나의 질문에 저장되었습니다!");
        } catch (error) {
            console.error("질문 저장 실패:", error);
            
            if (error.response && error.response.data && typeof error.response.data === 'string') {
                if (error.response.data.includes("이미 해당 질문이 저장되어 있습니다")) {
                    alert("⚠️ 이미 저장된 질문입니다.");
                } else {
                    alert(`❌ 오류: ${error.response.data}`);
                }
            } else {
                alert("❌ 질문 저장 중 예상치 못한 오류가 발생했습니다.");
            }
        }
    };

    // ✅ 면접 재시작 핸들러
    const handleRestartInterview = async () => {
        setIsLoading(true);
        // 상태 초기화
        setQuestionIndex(0);
        setInterviewQuestions([]);
        setUserAnswer("");
        setAnswer("");
        setFeedback("");
        setIsAnswerSubmitted(false);
        setAskedQuestions([]);
        setFeedbackHistory([]);
        setAnswerHistory([]);
        setIsInterviewFinished(false);
        // 초기 설정된 카테고리와 직무로 다시 질문 생성
        await fetchInterviewQuestions(initialCategory, initialJobTitle);
        setIsLoading(false);
    };
    

    return (
        <InterviewContext.Provider value={{
            question: interviewQuestions[questionIndex] || "",
            userAnswer,
            setUserAnswer,
            answer, // 현재 답변
            feedback, // 현재 피드백
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
            isConfirmed,
            isInterviewFinished, // ✅ 새로운 상태 전달
            handleRestartInterview, // ✅ 새로운 핸들러 전달
            questionIndex
        }}>
            {children}
        </InterviewContext.Provider>
    );
};

export default InterviewProvider;