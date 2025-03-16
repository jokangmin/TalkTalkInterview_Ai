import React, { useContext } from 'react';
import styles from '../../assets/css/Login/SignUpMain.module.css';
import Header from '../Header/Header';
import { SignUpContext } from '../../contexts/LoginContext/SignUpContext';

const SignUpMain = () => {
    const { 
        userId,
        userPassword,
        userName,
        userEmail,
        userIdError,
        handleIdBlur,
        handleIdChange,
        handlePasswordChange,
        handleNameChange,
        handleEmailChange,
        handleSubmit
    } = useContext(SignUpContext);

    return (
        <div className={styles.signup_main}>
            <Header />
            <div className={styles.signup_container}>
                <form className={styles.signup_form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>회원가입</h2>

                    {/* 이름 입력 */}
                    <div className={styles.input_group}>
                        <label htmlFor="name">이름</label>
                        <input
                            type="text"
                            id="name"
                            value={userName}
                            onChange={handleNameChange}
                            placeholder="이름을 입력하세요"
                        />
                    </div>

                    {/* 이메일 입력 */}
                    <div className={styles.input_group}>
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={userEmail}
                            onChange={handleEmailChange}
                            placeholder="이메일을 입력하세요"
                        />
                    </div>

                    {/* 아이디 입력 + 중복 체크 메시지 */}
                    <div className={styles.input_group}>
                        <label htmlFor="userId">아이디</label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={handleIdChange}
                            onBlur={handleIdBlur}
                            placeholder="아이디를 입력하세요"
                        />
                        {userIdError && <p className={styles.error_text}>{userIdError}</p>}
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className={styles.input_group}>
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={userPassword}
                            onChange={handlePasswordChange}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>

                    {/* 회원가입 버튼 */}
                    <button type="submit" className={styles.signup_button}>
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpMain;
