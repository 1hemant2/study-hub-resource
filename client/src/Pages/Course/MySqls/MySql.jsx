import React, { useEffect, useState } from 'react'
import { SubjectApi, TopicDetailsApi } from '../../../Api/subjectApi';
import Loader from '../../../component/Loader';
import CodeHightLighter from '../../../component/CodeHightLighter';
import { useNavigate, useParams } from 'react-router-dom';

const MySql = () => {
    const [topics, setTopics] = useState([]);
    const [topicName, setTopicName] = useState();
    const [topicDetails, setTopicDetails] = useState(String);
    const [codes, setCodes] = useState();
    const [output, setOutput] = useState();
    const [subtopics, setSubtopics] = useState([]);
    const [topicDownload, setTopicDownload] = useState();
    const [mobileTopicsMenu, setMobileTopicMenu] = useState(false);
    const [previousTopic, setPreviousTopic] = useState();
    const [nextTopic, setNextTopic] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const getTopicsNameFn = async () => {
        try {
            const data = await SubjectApi({ "subject": "mysql" });
            // console.log(data);
            setTopics(data);
        } catch (error) {
            console.log(error);
        }
    }
    const topicDetailFn = async (value) => {
        try {
            // console.log(value);
            setTopicName(value);
            const data = await TopicDetailsApi("mysql", value); //3.change
            setTopicDetails(data.topicDetails);
            setTopicDownload(data.downloadResource)
            setCodes(data.code);
            setOutput(data.output)
            setSubtopics(data.subtopics);
            navigate(`/mysql/${value}`)
            const indexOfTopic = topics.indexOf(value);
            if (indexOfTopic > 0) {
                setPreviousTopic(topics[indexOfTopic - 1]);
            } else {
                setPreviousTopic(undefined);
            }
            if (indexOfTopic < topics.length - 1) {
                setNextTopic(topics[indexOfTopic + 1])
            } else {
                setNextTopic(undefined);
            }
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
    const hanldeMobileMenuTopics = () => {
        setMobileTopicMenu(!mobileTopicsMenu);
    }
    useEffect(() => {
        getTopicsNameFn();
    }, [])
    useEffect(() => {
        if (topics.length > 0) {
            const { topics } = params;
            console.log(topics);
            if (topics) {
                topicDetailFn(topics);
            } else {
                topicDetailFn("Introduction to MySQL");
            }
        }
    }, [topics]);
    return (
        <div >
            {/* for laptop */}
            <div className='hidden sm:flex'>
                <div className='flex flex-row w-full'>
                    <div className='w-2/12 border-r-4 border-black '>
                        <div className='text-lg text-sky-600 font-semibold bg-slate-200'>topics</div>
                        <div className=' h-[650px] overflow-y-auto  bg-slate-50'>
                            {
                                topics && topics.map((t) => {
                                    return (<div key={t}>
                                        <div className='m-2 cursor-pointer text-blue-950'
                                            onClick={() => {
                                                topicDetailFn(t);
                                            }}
                                        >{t} </div>
                                        <hr></hr>
                                    </div>
                                    )

                                })
                            }
                        </div>
                    </div>
                    <div className='w-10/12 h-[900px] overflow-y-auto ml-3 mr-3'>
                        <div className='text-xl flex items-center justify-center mt-2 underline text-sky-600'>
                            {topicName}
                        </div>
                        {/* call api and display data instead of topic content */}
                        <div className='m-2 text-lg'>{topicDetails}</div>

                        {
                            codes &&
                            <div>
                                <CodeHightLighter language="mysql" code={codes}></CodeHightLighter>
                                {/* 4.change */}
                            </div>
                        }


                        {
                            output &&
                            <div>
                                <div>output:</div>
                                <CodeHightLighter language="mysql" code={output}></CodeHightLighter>
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
                                            <CodeHightLighter language="mysql" code={st.code}></CodeHightLighter>
                                            {/*6. change */}
                                        </div>
                                    }
                                    {
                                        st.output &&
                                        <div>
                                            <CodeHightLighter language="mysql" code={st.output}></CodeHightLighter>
                                            {/* 7.change */}
                                        </div>
                                    }
                                </div>
                            ))
                        }
                        <div className='h-[500px] overflow-y-auto flex flex-row justify-between '>
                            {
                                topicDetails ? (<button className='bg-slate-900 text-white h-6 cursor-pointer' onClick={handleDownload}><i className="ri-file-download-fill"></i> download resource</button>) : <Loader></Loader>
                            }
                            <div className='flex flex-row m-3 space-x-4 text-2xl '>
                                {
                                    previousTopic && (
                                        <div className='text-green-300 cursor-pointer'
                                            onClick={() => topicDetailFn(previousTopic)}
                                        >Prev</div>
                                    )
                                }
                                {
                                    nextTopic && (
                                        <div className='text-green-600 cursor-pointer'
                                            onClick={() => topicDetailFn(nextTopic)}
                                        >Next</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --------------------------------------------------------------------------------------------------------*/}

            {/* for mobile */}
            <div className=' sm:hidden pb-4'>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-col'>
                        <div className='text-4xl'
                            onClick={hanldeMobileMenuTopics}>
                            <i className="ri-menu-3-line">
                            </i>
                        </div>

                        <div className='border-r-4 border-black w-full'>
                            {mobileTopicsMenu ?
                                (<div className='w-full'>
                                    <div className='text-lg text-sky-600 font-semibold bg-slate-200'>topics</div>
                                    <div className=' h-[650px] overflow-y-auto  bg-slate-50'>
                                        {
                                            topics && topics.map((t) => {
                                                return (<div key={t}>
                                                    <div className='m-2 cursor-pointer text-blue-950 hover:bg-red-600'
                                                        onClick={() => {
                                                            topicDetailFn(t);
                                                            setMobileTopicMenu(!mobileTopicsMenu)
                                                        }}
                                                    >{t} </div>
                                                    <hr></hr>
                                                </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>) : null
                            }
                        </div>
                    </div>
                    <div className={`w-full h-[900px] overflow-y-auto m-1`}>
                        <div className='text-xl flex items-center justify-center mt-2 underline text-sky-600'>
                            {topicName}
                        </div>
                        {/* call api and display data instead of topic content */}
                        <div className='m-2 text-lg'>{topicDetails}</div>
                        {
                            codes &&
                            <div className='m-2 text-lg'>
                                <CodeHightLighter language="mysql" code={codes}></CodeHightLighter>
                                {/* 8.change */}
                            </div>
                        }


                        {
                            output &&
                            <div className='m-2 text-lg'>
                                <div>output:</div>
                                <CodeHightLighter language="mysql" code={output}></CodeHightLighter>
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
                                            <CodeHightLighter language="mysql" code={st.code}></CodeHightLighter>
                                            {/* 10.change */}
                                        </div>
                                    }
                                    {
                                        st.output &&
                                        <div>
                                            <div>output:</div>
                                            <CodeHightLighter language="mysql" code={st.output}></CodeHightLighter>
                                            {/* 11.change */}
                                        </div>
                                    }
                                </div>
                            ))
                        }

                        <div className='h-[300px] flex flex-row justify-between '>
                            {
                                topicDetails ? (
                                    <>
                                        <button className='bg-slate-900 text-white h-6 cursor-pointer' onClick={handleDownload}><i className="ri-file-download-fill"></i> download resource</button>

                                    </>
                                )

                                    : <Loader></Loader>
                            }
                            <div className='flex flex-row m-3 space-x-4 text-2xl'>
                                {
                                    previousTopic && (
                                        <div className='text-green-300 cursor-pointer'
                                            onClick={() => topicDetailFn(previousTopic)}
                                        >Prev</div>
                                    )
                                }
                                {
                                    nextTopic && (
                                        <div className='text-green-600 cursor-pointer'
                                            onClick={() => topicDetailFn(nextTopic)}
                                        >Next</div>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MySql;
