import { createContext, useState } from 'react';

const MyContext = createContext();
const MyProvider = ({ children }) => {
    const [serachValue, setSearchValue] = useState('');
    const setSearch = (value) => {
        setSearchValue(value);
    };
    return (
        <MyContext.Provider value={{ setSearch, serachValue }}>
            {children}
        </MyContext.Provider>
    )
};

export { MyContext, MyProvider };