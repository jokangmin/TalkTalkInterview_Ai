import React from 'react';
import styles from '../../assets/css/Question/MyQuestionsMain.module.css';
import Header from '../Header/Header';

const MyQuestions = () => {
    return (
        <div className={styles.container}>
            <Header />

            <h2 className={styles.title}>나의 질문</h2>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <p className={styles.question}>쿠키(Cookie), 세션(Session), 로컬 스토리지(Local Storage)의 차이점은 무엇인가요?</p>
                    <p className={styles.secondText}>Web Developer</p>
                </div>
                <div className={styles.card}>
                    <p className={styles.question}>React에서 불필요한 렌더링을 방지하는 방법은?</p>
                    <p className={styles.secondText}>Web Developer</p>
                </div>
                <div className={styles.card}>
                    <p className={styles.question}>HTML의 시멘틱 태그(semantic tag)에 대해 설명해주세요</p>
                    <p className={styles.secondText}>Web Developer</p>
                </div>
                <div className={styles.card}>
                    <p className={styles.question}>==과 ===의 차이점을 설명해주세요.</p>
                    <p className={styles.secondText}>Web Developer</p>
                </div>
                <div className={styles.card}>
                    <p className={styles.question}>CSRF(Cross-Site Request Forgery)와 XSS(Cross-Site Scripting)의 차이점과 방어 방법을 설명해주세요.</p>
                    <p className={styles.secondText}>Web Developer</p>
                </div>
                <div className={styles.card}>
                    <p className={styles.question}>웹 애플리케이션에서 보안을 강화하는 방법에는 어떤 것이 있나요?</p>
                    <p className={styles.secondText}>Web Developer</p>
                </div>
            </div>
        </div>
    );
};

export default MyQuestions;