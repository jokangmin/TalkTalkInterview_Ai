import React from 'react';
import styles from '../../assets/css/Header/Header.module.css';
import logo_image from '../../assets/image/TALKTALKINTERVIEW_LOGO_remove.png';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <ul className={styles.menu}>
                    <li className={styles.menu_item}><a href="/interview">AI 면접 코치</a></li>
                    <li className={styles.menu_item}><a href="#">나만의 질문</a></li>
                    <li className={styles.menu_item}><a href="#">로그인/회원가입</a></li>
                </ul>
                <div className={styles.logo}>
                    <a href="/"><img src={logo_image} alt="회사 로고" /></a>
                </div>
            </nav>
        </header>
    );
};

export default Header;