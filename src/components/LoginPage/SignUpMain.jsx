import React, { useContext, useState } from 'react';
import styles from '../../assets/css/Login/SignUpMain.module.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { SignUpContext } from '../../contexts/LoginContext/SignUpContext';

const SignUpMain = () => {
    const navigate = useNavigate();
    const { id,
            setId,
            password,
            setPassword,
            name,
            setName,
            email,
            setEmail,
            handleIdChange,
            handlePasswordChange,
            handleNameChange,
            handleEmailChange,
            handleSubmit} = useContext(SignUpContext);

    return (
        <div className={styles.signup_main}>
            <Header />
            <div className={styles.signup_container}>
                <form className={styles.signup_form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>회원가입</h2>
                    <div className={styles.input_group}>
                        <label htmlFor="name">이름</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="이름을 입력하세요"
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="이메일을 입력하세요"
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="id">아이디</label>
                        <input
                            type="text"
                            id="id"
                            value={id}
                            onChange={handleIdChange}
                            placeholder="아이디를 입력하세요"
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>
                    <button type="submit" className={styles.signup_button}>
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpMain;