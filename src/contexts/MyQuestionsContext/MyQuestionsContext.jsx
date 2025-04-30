import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PATH } from '../../../scripts/path';

export const MyQuestionsContext = createContext();

const MyQuestionsProvider = ({ children }) => {
    const [myQuestions, setMyQuestions] = useState([]);

    // 페이지네이션 상태
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = myQuestions.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(myQuestions.length / itemsPerPage);

    const handleCardClick = (card) => setSelectedCard(card);
    const handleCloseModal = () => setSelectedCard(null);
    const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    const fetchMyQuestions = async () => {
        try {
            const response = await axios.get(`${PATH.SERVER}/api/user/myQuestions`, {
                withCredentials: true
            });
            setMyQuestions(response.data);
        } catch (error) {
            console.error('질문 가져오기 실패:', error);
            alert('질문 가져오기 실패');
        }
    };

    useEffect(() => {
        fetchMyQuestions();
    }, []);

    return (
        <MyQuestionsContext.Provider value={{
            myQuestions,
            setMyQuestions,
            selectedCard,
            setSelectedCard,
            currentPage,
            setCurrentPage,
            currentItems,
            totalPages,
            handleCardClick,
            handleCloseModal,
            handleNext,
            handlePrev
        }}>
            {children}
        </MyQuestionsContext.Provider>
    );
};

export default MyQuestionsProvider;
