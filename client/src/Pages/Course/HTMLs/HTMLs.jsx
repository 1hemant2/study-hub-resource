import React, { useEffect, useState } from 'react'
import { SubjectApi, TopicDetailsApi } from '../../../Api/subjectApi';
import Loader from '../../../component/Loader';
const HTMLs = () => {
    const [topics, setTopics] = useState([]);
    const [topicName, setTopicName] = useState();
    const [topicDetails, setTopicDetails] = useState(String);
    const [codes, setCodes] = useState();
    const [output, setOutput] = useState();
    const [subtopics, setSubtopics] = useState([]);
    const [topicDownload, setTopicDownload] = useState("https://drive.google.com/uc?export=download&id=1Yu5JVk9o-wvbiyTkRjrJZez3AhYObDHP");
    const [mobileTopicsMenu, setMobileTopicMenu] = useState(false);
    const getTopicsNameFn = async () => {
        try {
            const data = await SubjectApi({ "subject": "html" });
            console.log(data);
            setTopics(data);
        } catch (error) {
            console.log(error);
        }
    }
    const topicDetailFn = async (value) => {
        try {
            console.log(value);
            setTopicName(value);
            const data = await TopicDetailsApi("html", value);
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
    const hanldeMobileMenuTopics = () => {
        setMobileTopicMenu(!mobileTopicsMenu);
    }
    useEffect(() => {
        getTopicsNameFn();
    }, [])
    useEffect(() => {
        if (topics.length > 0) {
            topicDetailFn("introduction");
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
                        <div className='m-2 text-lg bg-gray-400'>{codes}</div>
                        <div className='m-2 text-lg bg-blue-400'>{output}</div>
                        {
                            subtopics?.map(st => (
                                <div key={st.name}>
                                    <div className='m-1 bg-red-100'>{st.name}</div>
                                    <div className='m-1 bg-yellow-50'>{st.details}</div>
                                    <div className='m-1 bg-green-200'>{st.code}</div>
                                    <div className='m-1 bg-gray-300'>{st.output}</div>
                                </div>
                            ))
                        }
                        <div className='h-[500px] overflow-y-auto flex flex-row justify-between '>
                            {
                                topicDetails ? (<button className='bg-slate-900 text-white h-6 cursor-pointer' onClick={handleDownload}><i className="ri-file-download-fill"></i> download resource</button>) : <Loader></Loader>
                            }
                            <div className='flex flex-row m-3 space-x-4 text-2xl '>
                                <div className='text-green-300 cursor-pointer'>Prev</div>
                                <div className='text-green-600 cursor-pointer'>Next</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* for mobile */}
            <div className=' sm:hidden pb-4'>
                <div className='flex flex-row w-full'>
                    <div className='flex flex-col'>
                        <div className='text-4xl'
                            onClick={hanldeMobileMenuTopics}
                        ><i className="ri-menu-3-line"></i></div>
                        <div className='border-r-4 border-black w-full'>
                            {mobileTopicsMenu ?
                                (<div className='w-full'>
                                    <div className='text-lg text-sky-600 font-semibold bg-slate-200'>topics</div>
                                    <div className=' h-[650px] overflow-y-auto  bg-slate-50'>
                                        {

                                            topics && topics.map((t) => {
                                                // console.log(t);
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
                                </div>) : null
                            }
                        </div>
                    </div>
                    <div className={`w-full h-[900px] overflow-y-auto `}>
                        <div className='text-xl flex items-center justify-center mt-2 underline text-sky-600'>
                            {topicName}
                        </div>
                        {/* call api and display data instead of topic content */}
                        <div className='m-2 text-lg'>{topicDetails}</div>
                        <div className='h-[300px] flex flex-row justify-between '>
                            {
                                topicDetails ? (
                                    <>
                                        <button className='bg-slate-900 text-white h-6 cursor-pointer' onClick={handleDownload}><i className="ri-file-download-fill"></i> download resource</button>
                                        <div className='flex flex-row m-3 space-x-4 text-2xl'>
                                            <div className='text-green-300'>Prev</div>
                                            <div className='text-green-600'>Next</div>
                                        </div>
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

export default HTMLs;