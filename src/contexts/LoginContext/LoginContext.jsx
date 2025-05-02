import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useContext(AuthContext); // AuthContext에서 로그인 함수 가져오기
    const navigate = useNavigate();

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id.trim()) {
            setError("아이디를 입력해주세요.");
            return;
        }

        if (!password.trim()) {
            setError("비밀번호를 입력해주세요.");
            return;
        }

        try {
            const success = await login(id, password);
            if (success) {
                navigate('/');  // 로그인 성공 후 메인 페이지로 이동
            }
        } catch (error) {
            setError("아이디 또는 비밀번호를 확인해주세요.");
        }
    };

    return (
        <LoginContext.Provider value={{ id, setId, password, setPassword, handleIdChange, handlePasswordChange, handleSubmit, error, user }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
