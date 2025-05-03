import React, { useContext, useState } from 'react';
import styles from '../../assets/css/Question/MyQuestionsMain.module.css';
import Header from '../Header/Header';
import { MyQuestionsContext } from '../../contexts/MyQuestionsContext/MyQuestionsContext';

const MyQuestions = () => {
    const {
        currentItems,
        selectedCard,
        handleCardClick,
        handleCloseModal,
        currentPage,
        totalPages,
        handleNext,
        handlePrev
    } = useContext(MyQuestionsContext);
    

    return (
        <div className={styles.container}>
            <Header />
            <h2 className={styles.title}>나의 질문</h2>

            <div className={styles.cards}>
                {currentItems.map((card, index) => (
                    <div key={index} className={styles.card} onClick={() => handleCardClick(card)}>
                        <p className={styles.question}>{card.interviewQ}</p>
                        <p className={styles.category}>{card.jobTitle}</p>
                        <p className={styles.category}>{card.category}</p>
                    </div>
                ))}
            </div>

            <div className={styles.pagination}>
                <button onClick={handlePrev} disabled={currentPage === 1}>이전</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>다음</button>
            </div>

            {selectedCard && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.modalQuestion}>{selectedCard.interviewQ}</h3>
                        <p><strong>👔 나의 답변:</strong> {selectedCard.answer}</p>
                        <p><strong>🤖 AI 피드백:</strong> {selectedCard.feedback}</p>
                        <button className={styles.closeButton} onClick={handleCloseModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyQuestions;
