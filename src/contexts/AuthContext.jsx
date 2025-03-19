import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { PATH } from '../../scripts/path';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // 로그인된 사용자 상태 저장

    // 페이지 로드 시 localStorage에서 토큰 확인
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // 토큰이 있으면 로그인 상태로 설정 (토큰을 서버로 보내서 사용자 정보 복원)
            axios.get(`${PATH.SERVER}/api/user/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUser(response.data);  // 사용자 데이터 설정
            })
            .catch(() => {
                // 토큰이 유효하지 않으면 로그아웃 처리
                localStorage.removeItem('authToken');
            });
        }
    }, []);

    // 로그인 함수
    const login = async (id, password) => {
        try {
            const response = await axios.post(`${PATH.SERVER}/api/user/login`, {
                userId: id,
                userPassword: password
            });
            const userData = response.data;

            localStorage.setItem('authToken', userData.token);

            setUser(userData);
            return true;
        } catch (error) {
            throw error.response?.data?.error || error.message;
        }
    };

    // 로그아웃 함수
    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
