import React, { createContext, useState } from 'react';

export const SignUpContext = createContext();

const SignUpProvider = ({children}) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    

    const handleIdChange = (e) => setId(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 로직
        console.log('회원가입 - ID:', id, 'Password:', password, 'Name:', name, 'Email:', email);
        // 회원가입 완료 후 로그인 페이지로 이동
        navigate('/login');
    };


    return (
        <SignUpContext.Provider value={{ id,
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
                                         handleSubmit}}>
            {children}
        </SignUpContext.Provider>
    );
};

export default SignUpProvider;