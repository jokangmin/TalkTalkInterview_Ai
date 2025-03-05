import React, { createContext, useState } from 'react';

export const HeaderContext = createContext();

const HeaderProvider = ({children}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <HeaderContext.Provider value ={{ menuOpen, setMenuOpen }}>
            {children}
        </HeaderContext.Provider>
    );
};

export default HeaderProvider;