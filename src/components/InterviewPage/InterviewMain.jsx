import React, { useContext, useState } from 'react';
import { InterviewContext } from '../../contexts/InterviewContext/InterviewContext';
import styles from '../../assets/css/Interview/InterviewMain.module.css';
import Header from '../Header/Header';

const InterviewMain = () => {
    const {
        question, userAnswer, setUserAnswer, answerHistory, feedbackHistory,
        isAnswerSubmitted, handleSubmitAnswer, askedQuestions, handleSaveQuestion,
        handleSubmit, handleConfirm, setSelectedCategory, selectedCategory, 
        setJobTitle, jobTitle, isLoading, isConfirmed
    } = useContext(InterviewContext);

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
                                            <button
                                                className={styles.saveButton}
                                                onClick={() => handleSaveQuestion(q, answerHistory[index], feedbackHistory[index], selectedCategory, jobTitle)}
                                            >
                                                🧡 나의 질문 추가
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}

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
            </div>
        </div>
    );
};

export default InterviewMain;
