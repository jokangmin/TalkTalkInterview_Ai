import React, { useState } from 'react';
import styles from '../../assets/css/Question/MyQuestionsMain.module.css';
import Header from '../Header/Header';

//테스트용 즐겨찾기 데이터
const mockData = [
    {
        question: '쿠키(Cookie), 세션(Session), 로컬 스토리지(Local Storage)의 차이점은 무엇인가요?',
        category: 'Web Developer',
        answer: '쿠키는 클라이언트에 저장되고 서버에 자동 전송됩니다. 세션은 서버에 저장되며 사용자 식별에 사용됩니다. 로컬 스토리지는 클라이언트에만 저장되고 전송되지 않습니다.',
        feedback: '답변의 개념 구분은 명확합니다. 예시를 곁들이면 더 좋겠습니다.'
    },
    {
        question: 'React에서 불필요한 렌더링을 방지하는 방법은?',
        category: 'Web Developer',
        answer: 'React.memo, useMemo, useCallback 등을 활용해 불필요한 리렌더링을 방지할 수 있습니다.',
        feedback: '핵심 기술을 잘 언급하셨습니다. 각각의 차이점도 간단히 언급하면 더 좋겠습니다.'
    },
    {
        question: 'HTML의 시멘틱 태그에 대해 설명해주세요.',
        category: 'Web Developer',
        answer: '시멘틱 태그는 의미를 가진 태그로, 코드의 구조와 접근성을 향상시킵니다.',
        feedback: '기본적인 설명은 좋습니다. 예: `<article>`, `<section>` 등을 언급해주세요.'
    },
    {
        question: '==과 ===의 차이점을 설명해주세요.',
        category: 'Web Developer',
        answer: '`==`는 타입 변환 후 비교, `===`는 타입까지 일치하는지 비교합니다.',
        feedback: '정확한 설명입니다. 예시와 함께 설명하면 더 좋습니다.'
    },
    {
        question: 'CSRF와 XSS의 차이점과 방어 방법은?',
        category: 'Web Developer',
        answer: 'CSRF는 인증을 이용한 공격, XSS는 스크립트를 삽입하는 공격입니다. 각각 토큰, 인코딩으로 방어합니다.',
        feedback: '방어 방법까지 잘 설명했습니다. 구체적 예시가 있다면 더 좋습니다.'
    },
    {
        question: '웹 애플리케이션 보안을 강화하는 방법은?',
        category: 'Web Developer',
        answer: 'HTTPS 사용, 입력 검증, CSP 설정 등을 통해 보안을 강화할 수 있습니다.',
        feedback: '실제 적용 기술들을 잘 언급했습니다.'
    },
    {
        question: 'RESTful API의 특징은 무엇인가요?',
        category: 'Backend Developer',
        answer: '자원 기반 URI, 무상태성, HTTP 메서드 활용 등의 특징이 있습니다.',
        feedback: 'RESTful 개념이 잘 요약되어 있습니다.'
    },
    {
        question: 'SQL Injection이란 무엇이며 방지 방법은?',
        category: 'Backend Developer',
        answer: '쿼리에 악의적 SQL 삽입을 하는 공격이며, PreparedStatement로 방지 가능합니다.',
        feedback: '원리와 대응 방법을 정확히 언급했습니다.'
    },
    {
        question: 'HTTP와 HTTPS의 차이점은?',
        category: 'Web Developer',
        answer: 'HTTPS는 SSL 인증서를 사용하여 암호화된 통신을 제공합니다.',
        feedback: '기본 개념은 정확합니다. 인증서의 역할을 더 자세히 설명하면 좋습니다.'
    },
    {
        question: '브라우저 렌더링 과정에 대해 설명해주세요.',
        category: 'Web Developer',
        answer: 'HTML 파싱 → DOM 생성 → CSSOM 생성 → Render Tree → Layout → Painting',
        feedback: '렌더링 플로우를 잘 이해하고 있습니다.'
    },
];


const MyQuestions = () => {

    //임시 페이징 처리 부분 ************************************
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = mockData.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(mockData.length / itemsPerPage);

    const handleCardClick = (card) => setSelectedCard(card);
    const handleCloseModal = () => setSelectedCard(null);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    //임시 페이징 처리 부분 ************************************ end

    return (
        <div className={styles.container}>
            <Header />
            <h2 className={styles.title}>나의 질문</h2>

            <div className={styles.cards}>
                {currentItems.map((card, index) => (
                    <div key={index} className={styles.card} onClick={() => handleCardClick(card)}>
                        <p className={styles.question}>{card.question}</p>
                        <p className={styles.category}>{card.category}</p>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 버튼 */}
            <div className={styles.pagination}>
                <button onClick={handlePrev} disabled={currentPage === 1}>이전</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>다음</button>
            </div>

            {/* 모달 */}
            {selectedCard && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.modalQuestion}>{selectedCard.question}</h3>
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
