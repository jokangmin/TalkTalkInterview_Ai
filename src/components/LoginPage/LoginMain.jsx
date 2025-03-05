import React, { useContext, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext/LoginContext';
import styles from '../../assets/css/Login/LoginMain.module.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const LoginMain = () => {
    const navigate = useNavigate();
    const {id, setId, password, setPassword, handleIdChange, handlePasswordChange, handleSubmit} = useContext(LoginContext);
    

    return (
        <div className={styles.login_main}>
            <Header />
            <div className={styles.login_container}>
                <form className={styles.login_form} onSubmit={handleSubmit}>
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
                    <div className={styles.signUp_text1}>
                        <p>이용을 위해 <a className={styles.signUp_text2} href="#" onClick={(e) => { e.preventDefault(); navigate('/signUp'); }}>
                            회원가입
                        </a> 해주세요!</p>
                    </div>
                    <button type="submit" className={styles.login_button}>
                        로그인
                    </button>
                    <button type="submit" className={styles.login_button2}>
                        소셜 로그인 추가 예정
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginMain;