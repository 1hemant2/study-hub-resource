import React, { useContext, useEffect, useState } from 'react'
import { serachDataApi } from '../../Api/subjectApi';
import NoSearchResult from './NoSearchResult';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../component/MyContext';
import Spinner from '../../component/Spinner';


const SearchReult = () => {
    const [topics, setTopics] = useState([]);
    const { serachValue } = useContext(MyContext);
    const navigate = useNavigate();
    const [isLoad, setIsLoad] = useState(true);


    const onSearch = async () => {
        const backendData = await serachDataApi(serachValue);
        // console.log(backendData)
        if (backendData) {
            setIsLoad(false);
        }
        setTopics(backendData);
    };
    const handleNavigate = async (topicName, subjectName) => {
        navigate(`/searchResultData/${subjectName}/${topicName}`);
        // console.log(topicName, subjectName);
    }
    useEffect(() => {
        onSearch();
    }, [serachValue])

    return (
        <>
            {
                isLoad ? <Spinner></Spinner> :
                    <div className='w-full flex flex-row mt-5'>
                        <div className='w-1/5'></div>
                        <div className='w-3/5 '>
                            <div className='flex justify-center text-2xl'>{serachValue ? (<div>select the topic to continue</div>) : (<div>enter the topic name in search box </div>)}</div>
                            <div className='h-[700px] overflow-y-auto '>
                                {
                                    topics.length > 0 ?
                                        topics.map((t, index) => (
                                            <div key={index} className='mt-6  text-blue-500 cursor-pointer '
                                                onClick={() => handleNavigate(t.topicName, t.subject)}
                                            >
                                                {t.topicName}
                                                <hr></hr>
                                            </div>
                                        )) : <NoSearchResult></NoSearchResult>
                                }
                            </div>
                        </div>
                        <div className='w-1/5'></div>
                    </div>
            }
        </>
    )
}

export default SearchReult