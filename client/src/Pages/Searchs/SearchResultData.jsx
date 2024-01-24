import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { TopicDetailsApi } from '../../Api/subjectApi';
import { useState } from 'react';
import CodeHightLighter from '../../component/CodeHightLighter';
import Loader from '../../component/Loader';
const SearchResultData = () => {
    const [topicName, setTopicName] = useState();
    const [subjectName, setSubjectName] = useState();
    const [topicDetails, setTopicDetails] = useState(String);
    const [codes, setCodes] = useState();
    const [output, setOutput] = useState();
    const [subtopics, setSubtopics] = useState([]);
    const [topicDownload, setTopicDownload] = useState();
    const params = useParams();
    // console.log(params.subject);
    const topicDetailFn = async () => {
        try {
            // console.log(value);
            setSubjectName(params.subject);
            setTopicName(params.topicName)
            const data = await TopicDetailsApi(params.subject, params.topicName); //3.change
            console.log(data);
            setTopicDetails(data.topicDetails);
            setTopicDownload(data.downloadResource)
            setCodes(data.code);
            setOutput(data.output)
            setSubtopics(data.subtopics);
            // console.log(data.subtopics);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDownload = async () => {
        try {
            window.open(topicDownload);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        topicDetailFn();
    }, [])

    return (
        <div>
            {/* for laptop */}
            <div className='hidden sm:flex'>
                <div className='flex flex-row w-full'>
                    <div className='w-1/12'></div>
                    <div className='w-11/12 h-[900px] overflow-y-auto  pr-4'>
                        <div className='text-xl flex items-center justify-center mt-2 underline text-sky-600'>
                            {topicName}
                        </div>
                        {/* call api and display data instead of topic content */}
                        <div className='m-2 text-lg'>{topicDetails}</div>

                        {
                            codes &&
                            <div>
                                <CodeHightLighter language="html" code={codes}></CodeHightLighter>
                                {/* 4.change */}
                            </div>
                        }


                        {
                            output &&
                            <div>
                                <div>output:</div>
                                <CodeHightLighter language="html" code={output}></CodeHightLighter>
                                {/* 5.change */}
                            </div>
                        }
                        <div className='m-2 text-lg bg-blue-400'></div>
                        {
                            subtopics?.map(st => (
                                <div key={st.name} className='mt-10'>
                                    <div className='m-1  text-blue-700 text-xl flex justify-center'>{st.name}</div>
                                    <div className='m-1 '>{st.details}</div>
                                    {st.code &&
                                        <div>
                                            <CodeHightLighter language="html" code={st.code}></CodeHightLighter>
                                            {/*6. change */}
                                        </div>
                                    }
                                    {
                                        st.output &&
                                        <div>
                                            <CodeHightLighter language="html" code={st.output}></CodeHightLighter>
                                            {/* 7.change */}
                                        </div>
                                    }
                                </div>
                            ))
                        }
                        <div className='h-[500px] overflow-y-auto flex flex-row justify-between '>
                            {
                                topicDownload ? (<button className='bg-slate-900 text-white h-6 cursor-pointer' onClick={handleDownload}><i className="ri-file-download-fill"></i> download resource</button>) : <Loader></Loader>
                            }
                        </div>
                    </div>

                </div>
            </div>

            {/* --------------------------------------------------------------------------------------------------------*/}

            {/* for mobile */}
            <div className=' sm:hidden pb-4 p-2'>
                <div className='flex flex-col w-full'>
                    <div className={`w-full h-[900px] overflow-y-auto m-1`}>
                        <div className='text-xl flex items-center justify-center mt-2 underline text-sky-600'>
                            {topicName}
                        </div>
                        {/* call api and display data instead of topic content */}
                        <div className='m-2 text-lg'>{topicDetails}</div>
                        {
                            codes &&
                            <div className='m-2 text-lg'>
                                <CodeHightLighter language="html" code={codes}></CodeHightLighter>
                                {/* 8.change */}
                            </div>
                        }


                        {
                            output &&
                            <div className='m-2 text-lg'>
                                <div>output:</div>
                                <CodeHightLighter language="html" code={output}></CodeHightLighter>
                                {/* 9.change */}
                            </div>
                        }
                        {
                            subtopics?.map(st => (
                                <div key={st.name} className='mt-10'>
                                    <div className='m-1 text-blue-700 text-xl flex justify-center'>{st.name}</div>
                                    <div className='m-1 '>{st.details}</div>
                                    {st.code &&
                                        <div>
                                            <CodeHightLighter language="html" code={st.code}></CodeHightLighter>
                                            {/* 10.change */}
                                        </div>
                                    }
                                    {
                                        st.output &&
                                        <div>
                                            <div>output:</div>
                                            <CodeHightLighter language="html" code={st.output}></CodeHightLighter>
                                            {/* 11.change */}
                                        </div>
                                    }
                                </div>
                            ))
                        }

                        <div className='h-[300px] flex flex-row justify-between '>
                            {
                                topicDownload ? (
                                    <>
                                        <button className='bg-slate-900 text-white h-6 cursor-pointer' onClick={handleDownload}><i className="ri-file-download-fill"></i> download resource</button>

                                    </>
                                )

                                    : <Loader></Loader>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultData;