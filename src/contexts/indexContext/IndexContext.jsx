import React, { createContext, useEffect, useState } from 'react';

export const IndexContext = createContext();

const IndexProvider = ({children}) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <IndexContext.Provider value={{ scrollY }}>
            {children}
        </IndexContext.Provider>
    );
};

export default IndexProvider;

