import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { PATH } from '../../scripts/path';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // 로그인된 사용자 상태 저장

    // ✅ 페이지 로드 시 localStorage에서 토큰 확인 후 로그인 유지
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('userData');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser)); // 저장된 사용자 정보 복원
        }
    }, []);

    // ✅ 로그인 함수
    const login = async (id, password) => {
        try {
            console.log("👉 요청 데이터: ", { userId: id, userPassword: password });

            const response = await axios.post(`${PATH.SERVER}/api/user/login`, {
                userId: id,
                userPassword: password
            }, {
                withCredentials: true // 쿠키 포함 요청
            });

            console.log("✅ 로그인 응답 수신: ", response.data);

            const userData = response.data;

            // ✅ 로그인 정보 저장 (accessToken & user 정보)
            localStorage.setItem('authToken', userData.accessToken);
            localStorage.setItem('userData', JSON.stringify(userData));

            setUser(userData); // 상태 업데이트
            return true;
        } catch (error) {
            console.error("❌ 로그인 오류: ", error);
            throw error.response?.data?.error || error.message;
        }
    };

    // ✅ 로그아웃 함수
    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken'); // 토큰 삭제
        localStorage.removeItem('userData'); // 사용자 정보 삭제
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
