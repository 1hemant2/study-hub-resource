import React, { useEffect, useState } from 'react'
import { SubjectApi, TopicDetailsApi } from '../../../Api/subjectApi';
const MySqls = () => {
    const [topics, setTopics] = useState([]);
    const [topicName, setTopicName] = useState();
    const [topicDetails, setTopicDetails] = useState(String);
    const [topicDownload, setTopicDownload] = useState("https://drive.google.com/uc?export=download&id=1OELCdTy2eqn87giXxyXu1-RrntI2CDQ-");
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
            console.log(value);
            setTopicName(value);
            const data = await TopicDetailsApi("mysql", value);
            setTopicDetails(data.topicDetails);
            setTopicDownload(data.downloadResource)
            console.log(data);
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
        getTopicsNameFn();
    }, [])
    return (
        <div>
            <div className='flex flex-row ml-1'>
                <div className='w-2/12 border-r-4 border-black '>
                    <div className='text-lg text-sky-600 font-semibold bg-slate-200'>topics</div>
                    <div className='ml-4'>
                        <ol>
                            {
                                topics.map((t) => {
                                    // console.log(t);
                                    return (<div key={t}>
                                        <li className='mt-2 mb-2 bg-slate-100 cursor-pointer'
                                            onClick={() => {
                                                topicDetailFn(t);
                                            }}
                                        >{t} </li>
                                        <hr></hr>
                                    </div>
                                    )

                                })
                            }

                        </ol>
                    </div>
                </div>
                <div className='w-10/12 '>
                    <div className='text-xl flex items-center justify-center mt-2 underline text-sky-600'>
                        {topicName}
                    </div>
                    {/* call api and display data instead of topic content */}
                    <div className='m-2 text-lg'>{topicDetails}</div>
                    {
                        topicDetails ? (<button className='bg-slate-900 text-white h-6 cursor-pointer' onClick={handleDownload}><i className="ri-file-download-fill"></i> download resource</button>) : <div className='flex items-center justify-center font-extrabold'>select the topic</div>
                    }
                </div>
            </div>

        </div>
    )
}

export default MySqls;