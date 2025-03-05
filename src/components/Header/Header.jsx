import React, { useContext } from 'react';
import styles from '../../assets/css/Header/Header.module.css';
import logo_image from '../../assets/image/TALKTALKINTERVIEW_LOGO_remove.png';
import { useNavigate } from 'react-router-dom';
import { HeaderContext } from '../../contexts/HeaderContext/HeaderContext';

const Header = () => {
    const navigate = useNavigate();
    const { menuOpen, setMenuOpen } = useContext(HeaderContext);

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                {/* 햄버거 메뉴 버튼 */}
                <div 
                    className={styles.menu_toggle} 
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </div>

                {/* 메뉴 리스트 */}
                <ul className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
                    <li className={styles.menu_item}>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/interview'); }}>
                            AI 면접 코치
                        </a>
                    </li>
                    <li className={styles.menu_item}>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/custom-questions'); }}>
                            나만의 질문
                        </a>
                    </li>
                    <li className={styles.menu_item}>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                            로그인/회원가입
                        </a>
                    </li>
                </ul>

                {/* 로고 */}
                <div className={styles.logo}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                        <img src={logo_image} alt="회사 로고" />
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
