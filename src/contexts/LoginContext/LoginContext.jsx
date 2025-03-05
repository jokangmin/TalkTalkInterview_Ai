import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

const LoginProvider = ({children}) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 로직 처리
        console.log('ID:', id, 'Password:', password);
    };

    return (
        <LoginContext.Provider value={{id, setId, password, setPassword, handleIdChange, handlePasswordChange, handleSubmit}}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;