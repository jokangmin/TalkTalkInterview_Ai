import React, { createContext, useState } from 'react';
import axios from "axios";
import { PATH } from '../../../scripts/path';
import { useNavigate } from 'react-router-dom';

export const SignUpContext = createContext();

const SignUpProvider = ({children}) => {
    const [userId, setId] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userName, setName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const navigate = useNavigate();
    

    const handleIdChange = (e) => setId(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleIdBlur = async () => {
        if (!userId.trim()) {
            setUserIdError("아이디를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.get(`${PATH.SERVER}/api/user/idCheck`, {params: {userId}});
            if (response.status === 201) {
                setUserIdError("사용 가능한 아이디입니다.");
            }
        } catch (error) {
            if (error.response.status === 409) {
                setUserIdError("이미 사용 중인 아이디입니다.");
            } else {
                setUserIdError("아이디 중복 확인에 실패했습니다.");
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userName.trim() || !userEmail.trim() || !userId.trim() || !userPassword.trim()) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        if (userIdError === "이미 사용 중인 아이디입니다.") {
            alert("다른 아이디를 사용해주세요.");
            return;
        }

        // 회원가입 처리 로직
        try {
            await axios.post(`${PATH.SERVER}/api/user/join`, {
                userId: userId,
                pwd: userPassword,
                name: userName,
                email: userEmail
            });
            alert("회원가입 성공!");
            navigate('/');
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다.");
        }
        
        
    };


    return (
        <SignUpContext.Provider value={{ userId,
                                         setId,
                                         userPassword,
                                         setPassword,
                                         userName,
                                         setName,
                                         userEmail,
                                         setEmail,
                                         userIdError,
                                         handleIdBlur,
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