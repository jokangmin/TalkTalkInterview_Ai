import React, { createContext } from 'react';

export const MyQuestionsContext = createContext();

const MyQuestionsProvider = ({children}) => {
    return (
        <MyQuestionsContext.Provider value={{
            
        }}>
            {children}
        </MyQuestionsContext.Provider>
    );
};

export default MyQuestionsProvider;