import React, { useContext, useState } from 'react';
import { InterviewContext } from '../../contexts/InterviewContext/InterviewContext';
import styles from '../../assets/css/Interview/InterviewMain.module.css';
import Header from '../Header/Header';

const InterviewMain = () => {
    const { question, userAnswer, setUserAnswer, answerHistory, feedbackHistory,
         isAnswerSubmitted, handleSubmitAnswer, askedQuestions } = useContext(InterviewContext);
    
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const handleSubmit = async () => {
        setIsLoading(true); // 로딩 시작
        await handleSubmitAnswer(); // 기존 제출 함수 실행
        setIsLoading(false); // 응답 완료 후 로딩 종료
    };

    return (
        <div className={styles.container}>
            <Header />
            <h2 className={styles.title}>AI 면접 코치</h2>
            
            {/* 질문 및 답변 영역 */}
            <div className={styles.historySection}>
                {askedQuestions.map((q, index) => (
                    <div key={index} className={styles.questionBlock}>
                        <h3 className={styles.question}>👤 {q}</h3>
                        <div className={styles.answerContainer}>
                            {index === askedQuestions.length - 1 ? (
                                <p className={styles.currentQuestion}>현재 질문에 대한 답변을 입력하세요.</p>
                            ) : (
                                <>
                                    <p><strong>👔 나의 답변 : </strong> {answerHistory[index]}</p>
                                    <p><strong>🤖 AI의 피드백 : </strong> {feedbackHistory[index]}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}

                {/* 로딩 상태일 때 로딩 메시지 표시 */}
                {isLoading && (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>AI가 피드백을 작성 중입니다...</p>
                    </div>
                )}
            </div>

            {/* 답변 입력 및 버튼 영역 */}
            <textarea
                className={styles.textarea}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="면접 답변을 입력하세요..."
                disabled={isAnswerSubmitted || isLoading}
            />
            <div className={styles.buttonarea}>
                <button
                    className={`${styles.button} ${isAnswerSubmitted || isLoading ? styles.disabled : ''}`}
                    onClick={handleSubmit}
                    disabled={isAnswerSubmitted || isLoading}
                >
                    <span className={styles.button_content}>
                        {isLoading ? "피드백 생성 중..." : (isAnswerSubmitted ? "답변 제출됨" : "답변 제출")}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default InterviewMain;
