import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const InterviewContext = createContext();

const InterviewProvider = ({children}) => {
    const [questionIndex, setQuestionIndex] = useState(0);  // 현재 질문 인덱스 관리
    const [userAnswer, setUserAnswer] = useState("");  // 사용자의 답변
    const [answer, setAnswer] = useState("");  // 제출된 답변
    const [feedback, setFeedback] = useState("");  // 피드백 상태
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false); // 답변 제출 여부
    const [askedQuestions, setAskedQuestions] = useState([]);  // 이미 나온 질문들
    const [feedbackHistory, setFeedbackHistory] = useState([]); //나왔던 피드백 목록
    const [answerHistory, setAnswerHistory] = useState([]); //했던 답변 목록
    const apiKey = import.meta.env.VITE_GPT_API_KEY;

    // 질문 목록
    const interviewQuestions = [
        "React의 useState와 useEffect의 차이점을 설명해주세요.",
        "CSR과 SSR의 차이점은 무엇인가요?",
        "프론트엔드에서 상태 관리를 위한 라이브러리에는 무엇이 있나요?",
        "이전에 경험했던 성능 최적화 사례를 설명해주세요.",
        "호이스팅 개념에 대해 간략하게 서술하세요.",
        "클로저 개념에 대해 설명해주세요.",
        "==과 ===의 차이점을 설명해주세요.",
        "자바스크립트의 비동기 처리 방법에 대해 말씀해주세요.",
        "프로토타입에 대해 설명해주세요.",
        "this 키워드의 작동 방식에 대해 서술하고 this의 적용 범위에 대해 말씀해 주세요.",
        "스코프에 대해 설명하세요.",
        "동기와 비동기에 대해 말해주세요.",
        "이벤트 루프에 대해 설명하세요.",
        "DOM 조작과 이벤트 처리에 대해 아는만큼 말해주세요.",
        "HTML의 시멘틱 태그(semantic tag)에 대해 설명해주세요.",
        "<div>와 <section>의 차이점은 무엇인가요?",
        "CSS의 Flexbox와 Grid의 차이점은 무엇인가요?",
        "CSS에서 rem, em, px, % 단위의 차이를 설명해주세요.",
        "반응형 웹 디자인(Responsive Web Design)을 구현하는 방법에는 어떤 것이 있나요?",
        "CSS overflow, z-index, opacity의 동작 방식에 대해 설명해주세요.",
        "웹 접근성(Web Accessibility)이 중요한 이유와 구현 방법을 설명해주세요.",
        "var, let, const의 차이를 설명해주세요.",
        "Promise와 async/await의 차이점을 설명해주세요.",
        "React의 Virtual DOM이란 무엇이며, 어떻게 동작하나요?",
        "React에서 상태(State)와 props의 차이를 설명해주세요.",
        "React에서 Context API를 사용하는 이유는 무엇인가요?",
        "React에서 key 속성의 역할은 무엇인가요?",
        "브라우저 렌더링 최적화를 위해 할 수 있는 방법을 설명해주세요.",
        "React에서 불필요한 렌더링을 방지하는 방법은?",
        "코드 스플리팅(Code Splitting)이란 무엇이며, 어떻게 적용하나요?",
        "이미지 최적화(Image Optimization)를 어떻게 하면 좋을까요?",
        "브라우저에서 HTML, CSS, JavaScript가 실행되는 과정(렌더링 과정)을 설명해주세요.",
        "쿠키(Cookie), 세션(Session), 로컬 스토리지(Local Storage)의 차이점은 무엇인가요?",
        "HTTP 요청과 응답 과정에 대해 설명해주세요.",
        "CORS(Cross-Origin Resource Sharing)란 무엇이며, 어떻게 해결할 수 있나요?",
        "웹팩(Webpack)과 Vite의 차이를 설명해주세요.",
        "HTTP와 HTTPS의 차이를 설명해주세요.",
        "GET과 POST 요청의 차이점을 설명해주세요.",
        "RESTful API란 무엇이며, RESTful하게 API를 설계하는 원칙은 무엇인가요?",
        "CSRF(Cross-Site Request Forgery)와 XSS(Cross-Site Scripting)의 차이점과 방어 방법을 설명해주세요.",
        "JWT(JSON Web Token) 인증 방식에 대해 설명해주세요.",
        "웹 애플리케이션에서 보안을 강화하는 방법에는 어떤 것이 있나요?",
        "프론트엔드 개발자가 DevOps를 알아야 하는 이유는 무엇인가요?"
    ];

    // 답변 제출 처리
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

        const feedbackRequest = `당신은 면접관입니다. 사용자의 답변에 대한 태도와 말투 분석 그리고 피드백을 주세요. 면접관의 질문: ${interviewQuestions[questionIndex]} , 사용자의 답변: ${userAnswer}`;

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "당신은 면접관입니다. 사용자의 답변에 대한 피드백을 조건에 맞게 작성해주세요."},
                        { role: "system", content: "피드백의 초반은 질문에 대해 사용자의 답변이 어떠한 지 분석해 피드백 \n 중후반은 사용자의 답변에서 태도와 말투를 분석해서 피드백 \n 문단별로 줄바꿈 하며 출력한다."},
                        { role: "user", content: `1. 면접관(당신)의 질문: ${interviewQuestions[questionIndex]} \n2. 사용자의 답변 : ${userAnswer} \n3. 피드백의 어조 : 차분하고 지적인 말투 \n4. 피드백의 목적 : 사용자가 면접에 대한 피드백을 얻기 위해서`}
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

            setFeedback(response.data.choices[0].message.content);
            setFeedbackHistory((prev) => [...prev, response.data.choices[0].message.content]);
        } catch (error) {
            console.error("Error:", error);
            setFeedback("피드백을 가져오는 중 오류가 발생했습니다.");
        }
    };

    const getRandomQuestion = () => {
        const remainingQuestions = interviewQuestions.filter(q => !askedQuestions.includes(q));

        if (remainingQuestions.length === 0) {
            setAskedQuestions([]);
            return interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)];
        }

        const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
        const selectedQuestion = remainingQuestions[randomIndex];

        setAskedQuestions((prev) => [...prev, selectedQuestion]);
        return selectedQuestion;
    };

    useEffect(() => {
        const firstQuestion = getRandomQuestion();
        setQuestionIndex(interviewQuestions.indexOf(firstQuestion));
    }, []);

    const handleNextQuestion = () => {
        const nextQuestion = getRandomQuestion();
        setQuestionIndex(interviewQuestions.indexOf(nextQuestion));
        setUserAnswer("");
        setAnswer("");
        setFeedback("");
        setIsAnswerSubmitted(false);
    };

    // 나의 질문에 저장
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
                memberId: memberId,
                interviewQ: questionText,
                answer: answer,
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
            question: interviewQuestions[questionIndex],
            userAnswer,
            setUserAnswer,
            answer,
            feedback,
            isAnswerSubmitted,
            handleSubmitAnswer,
            askedQuestions,
            feedbackHistory,
            answerHistory,
            handleSaveQuestion
        }}>
            {children}
        </InterviewContext.Provider>
    );
};

export default InterviewProvider;