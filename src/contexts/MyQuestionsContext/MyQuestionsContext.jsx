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
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`${PATH.SERVER}/api/user/myQuestions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMyQuestions(response.data.reverse());
        } catch (error) {
            console.error('질문 가져오기 실패:', error);
            alert('질문 가져오기 실패');
        }
    };

    //질문 삭제 부분
    const handleDeleteQuestion = async (id) => {
        if (!window.confirm("정말로 이 질문을 삭제하시겠습니까?")) return;
    
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`${PATH.SERVER}/api/user/myQuestions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // 삭제 후 목록 갱신
            setMyQuestions((prev) => prev.filter((q) => q.id !== id));
            alert("질문이 삭제되었습니다.");
            handleCloseModal();
        } catch (error) {
            console.error('질문 삭제 실패:', error);
            alert('질문 삭제에 실패했습니다.');
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
            handlePrev,
            handleDeleteQuestion
        }}>
            {children}
        </MyQuestionsContext.Provider>
    );
};

export default MyQuestionsProvider;
