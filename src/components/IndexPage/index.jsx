import React, { useContext } from 'react';
import logo_image from '../../assets/image/TALKTALKINTERVIEW_LOGO_remove.png';
import interview from '../../assets/image/interview_remove.png';
import down_arrow from '../../assets/image/down_arrow.png';
import hand from '../../assets/image/hand.png';
import {IndexContext} from '../../contexts/indexContext/IndexContext';
import Header from '../Header/Header';
import styles from '../../assets/css/Main/Index.module.css';

const index = () => {
    const { scrollY } = useContext(IndexContext);

    return(
        <>
            <Header/>

            {/* 추가된 부분 */}
            <div className={styles.styledHome} style={{ width: "100vw", overflowX: "hidden" }}>
                <section className={styles.sec01}>
                    <div className={styles.bgWrapper} style={{opacity: Math.max(0, 1 - scrollY / 300)}}>
                        <img className={styles.title_logo} style={{top: `${scrollY * 2}px`}} src={logo_image} alt="타이틀 로고 이미지" />
                        <h2
                            style={{
                                top: `${scrollY * 1}px`,
                                marginTop: `${450 + scrollY * 2}px`,
                            }}
                        >
                            면접 걱정은 이제 끝!
                        </h2>
                        
                    </div>
                </section>
                <section className={styles.sec02} style={{ top: `${scrollY * 1}px`, marginTop: `${100 - scrollY * 2}px`}}>
                    <div className={styles.bgWrapper2} style={{opacity: Math.max(0, 1 - (scrollY - 340) / 300)}}>
                        <img src={interview} alt="면접 이미지" />
                        <p>Ai 면접 피드백을 통한<br/>실제 면접 대비</p>
                    </div>
                </section>
                <section className={styles.sec03}>
                    <div className={styles.bgWrapper3} style={{opacity: Math.min(1, Math.max(0, (scrollY - 340) / 300))}}>
                        <img src={hand} alt="손 이미지" />
                        <div className={styles.phone}>
                            <div className={styles.phone_content}>
                                <p>안에 면접 채팅 앱 화면</p>
                            </div>
                        </div>
                    </div>
                </section>
                <img className={styles.down_arrow} src={down_arrow} alt="스크롤 이미지" />
            </div>
        </>
    );
};

export default index;