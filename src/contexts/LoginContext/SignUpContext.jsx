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
        
        if (!name.trim()) {
            alert("이름을 입력하세요.");
            return;
        }
        if (!email.trim()) {
            alert("이메일을 입력하세요.");
            return;
        }
        if (!id.trim()) {
            alert("아이디를 입력하세요.");
            return;
        }
        if (!password.trim()) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        // 회원가입 처리 로직 (예: API 요청)
        console.log("회원가입 성공!");
        navigate('/'); // 예시: 회원가입 후 메인 페이지로 이동
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