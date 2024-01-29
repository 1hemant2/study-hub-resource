import { createContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const MyContext = createContext();
const MyProvider = ({ children }) => {
    const [serachValue, setSearchValue] = useState('');

    // const navigate = useNavigate();
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