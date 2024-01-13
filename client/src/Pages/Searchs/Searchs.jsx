import React, { useState } from 'react'
import { Input } from 'antd';
import { serachDataApi } from '../../Api/subjectApi';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;



const Searchs = () => {
    const navigate = useNavigate();
    const onSearch = async (value) => {
        localStorage.setItem('searchValue', value);
        console.log(value);
        navigate('/searchResult');
    };

    return (
        <div>
            <div>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
        </div>
    )
}

export default Searchs;