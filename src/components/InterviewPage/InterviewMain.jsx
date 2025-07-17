import React, { useContext, useState } from 'react';
import { InterviewContext } from '../../contexts/InterviewContext/InterviewContext';
import styles from '../../assets/css/Interview/InterviewMain.module.css';
import Header from '../Header/Header';

const InterviewMain = () => {
    const {
        question, userAnswer, setUserAnswer, answer, feedback, // 현재 답변과 피드백 (렌더링에 필요)
        answerHistory, feedbackHistory, askedQuestions, handleSaveQuestion,
        isAnswerSubmitted, handleSubmitAnswer, 
        handleSubmit, handleConfirm, setSelectedCategory, selectedCategory, 
        setJobTitle, jobTitle, isLoading, isConfirmed,
        isInterviewFinished, // ✅ 새로운 상태 가져오기
        handleRestartInterview, // ✅ 새로운 핸들러 가져오기
        questionIndex 
    } = useContext(InterviewContext);

    // ✅ 질문 표시 로직 변경: 면접이 끝났으면 종료 메시지를 보여줍니다.
    const displayQuestion = isInterviewFinished ? "질문을 모두 완료하였습니다! 다시 하시겠습니까?" : question;

    // ✅ 현재 질문에 대한 답변과 피드백을 보여주기 위한 로직
    // askedQuestions의 마지막 요소가 현재 질문이고, isAnswerSubmitted가 true일 때만 현재 feedback을 보여줌
    const currentQuestionIndexInAsked = askedQuestions.length - 1;
    const currentFeedbackToDisplay = isAnswerSubmitted && currentQuestionIndexInAsked === questionIndex ? feedback : null;


    return (
        <div className={styles.container}>
            <Header />
            <h2 className={styles.title}>AI 면접 코치</h2>

            {!isConfirmed && (
                <div className={styles.categoryModal}>
                    <h3 className={styles.modalTitle}>면접 유형을 선택해주세요</h3>
                    <div className={styles.categoryList}>
                        {["기술 면접", "인성 면접", "컬처핏 면접"].map((cat) => (
                            <button
                                key={cat}
                                className={`${styles.categoryButton} ${selectedCategory === cat ? styles.selected : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="지원하는 직무를 입력하세요 (예: 프론트엔드 개발자)"
                        className={styles.jobInput}
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                    <button className={styles.confirmButton} onClick={handleConfirm}>
                        선택 완료
                    </button>
                </div>
            )}

            <div className={`${!isConfirmed ? styles.blurred : ''}`}>
                {/* 질문 및 답변 영역 */}
                <div className={styles.questionMain}>
                    <div className={styles.historySection}>
                        {askedQuestions.map((q, index) => {
                            const isLastQuestionInHistory = index === askedQuestions.length - 1;
                            const feedbackForHistory = isLastQuestionInHistory ? feedback : feedbackHistory[index]; // 마지막 질문은 현재 feedback 사용

                            return (
                                <div key={index} className={styles.questionBlock}>
                                    <h3 className={styles.question}>👤 {q}</h3>
                                    <div className={styles.answerContainer}>
                                        {/* 현재 질문에 대한 답변 대기 중 */}
                                        {isLastQuestionInHistory && !isAnswerSubmitted && (
                                            <p className={styles.currentQuestion}>현재 질문에 대한 답변을 입력하세요.</p>
                                        )}
                                        
                                        {/* 답변이 존재할 경우에만 나의 답변 표시 */}
                                        {answerHistory[index] && <p><strong>👔 나의 답변 : </strong> {answerHistory[index]}</p>}
                                        
                                        {/* 피드백이 존재할 경우에만 AI 피드백 표시 */}
                                        {feedbackForHistory && <p><strong>🤖 AI의 피드백 : </strong> {feedbackForHistory}</p>}
                                        
                                        {/* 피드백까지 모두 받은 질문에 대해서만 저장 버튼 표시 */}
                                        {/* 현재 질문이고 아직 피드백이 오지 않았으면 저장 버튼 비활성화 */}
                                        {((!isLastQuestionInHistory || (isLastQuestionInHistory && feedbackForHistory)) && !isLoading) && (
                                            <button
                                                className={styles.saveButton}
                                                onClick={() => handleSaveQuestion(q, answerHistory[index], feedbackForHistory, selectedCategory, jobTitle)}
                                            >
                                                🧡 나의 질문 추가
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* ✅ 면접이 끝났을 때만 보이는 질문 완료 메시지 및 버튼 */}
                        {isInterviewFinished && (
                             <div className={styles.questionBlock}> {/* 기존 질문 블록 스타일 재활용 */}
                                <h3 className={styles.question}>
                                    👤 {displayQuestion}
                                    <button onClick={handleRestartInterview} className={styles.restartInterviewButton}>
                                        다시 하기
                                    </button>
                                </h3>
                                {/* 답변 컨테이너는 필요 없음 */}
                            </div>
                        )}

                        {isLoading && (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                                <p>질문 생성 및 피드백 중입니다...</p>
                            </div>
                        )}
                    </div>
                

                    {/* 답변 입력 및 버튼 영역 */}
                    <textarea
                        className={styles.textarea}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="면접 답변을 입력하세요..."
                        // ✅ 면접이 끝났으면 비활성화
                        disabled={isAnswerSubmitted || isLoading || isInterviewFinished} 
                    />
                    <div className={styles.buttonarea}>
                        <button
                            className={`${styles.button} ${isAnswerSubmitted || isLoading || isInterviewFinished ? styles.disabled : ''}`}
                            onClick={handleSubmit}
                            // ✅ 면접이 끝났으면 비활성화
                            disabled={isAnswerSubmitted || isLoading || isInterviewFinished} 
                        >
                            <span className={styles.button_content}>
                                {isLoading ? "피드백 생성 중..." : (isAnswerSubmitted ? "답변 제출됨" : "답변 제출")}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewMain;