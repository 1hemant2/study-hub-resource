import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import { serachDataApi } from '../../Api/subjectApi';

const SearchReult = () => {
    const [topics, setTopics] = useState({});

    const onSearch = async () => {
        const value = localStorage.getItem("searchValue")
        const response = await serachDataApi(value);
        setTopics((prevTopics) => ({ ...prevTopics, ...response[0] }));
        // if(!response){
        // setTopics((prevTopics) => ({ ...prevTopics, {data:no data found}));
        // }
        console.log(response[0]);
    };
    useEffect(() => {
        onSearch();
    }, [])
    return (
        <div className='flex flex-row'>
            <div className='w-1/6'></div>
            <div className='w-4/6 bg-slate-50'>
                <div className='text-xl underline flex justify-center mt-2'>{topics.topicName} ({topics.subject})</div>
                <div className='m-2'>{topics.topicDetails}</div>
                <button className='bg-slate-900 text-white h-6'><i className="ri-file-download-fill"></i> download resource</button>
            </div>
            <div className='w-1/6'></div>

        </div>
    )
}

export default SearchReult