import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { TopicDetailsApi } from '../../Api/subjectApi';
import { useState } from 'react';
import CodeHightLighter from '../../component/CodeHightLighter';
import Loader from '../../component/Loader';
import { editApi, deleteSubtopicApi, deltePostApi } from '../../Api/subjectApi';
import { useNavigate } from 'react-router-dom';


const SearchResultData = () => {
    const [topicName, setTopicName] = useState();
    const [topicDetails, setTopicDetails] = useState(String);
    const [codes, setCodes] = useState();
    const [output, setOutput] = useState();
    const [subtopics, setSubtopics] = useState([]);
    const [topicDownload, setTopicDownload] = useState();
    const [postId, setPostId] = useState();
    const [isEditing, setIsEditing] = useState({});
    const [orginalValue, setOriginalValue] = useState({})
    const [subTopicIndex, setSubTopicIndex] = useState();
    const [originalSubTopicValue, setOriginalSubTopicValue] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const topicDetailFn = async () => {
        try {
            // console.log(value);
            // setSubjectName(params.subject);
            setTopicName(params.topicName)
            const data = await TopicDetailsApi(params.subject, params.topicName); //3.change
            console.log(data);
            setTopicDetails(data.topicDetails);
            setTopicDownload(data.downloadResource)
            setCodes(data.code);
            setOutput(data.output)
            setSubtopics(data.subtopics);
            setPostId(data._id)
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
    const handleUpdate = (key, value) => {
        // console.log(key, value);
        setOriginalValue({ [key]: value })
        setIsEditing({ [key]: true });
    }
    const handleCancel = (key, value) => {

        key(orginalValue[value]);
        setIsEditing({ [key]: false });
    }
    const handleSave = async (key, value) => {
        setIsEditing({ etopicName: false });
        const data = await editApi({
            postId: postId,
            [key]: value
        })
        console.log(data);
    }
    const handleChange = (key, value) => {
        key(value);
    }
    const handleSubtopicIndex = (index) => {
        setOriginalSubTopicValue({
            'name': subtopics[index]?.name,
            'details': subtopics[index]?.details,
            'code': subtopics[index]?.code,
            'output': subtopics[index]?.output
        });
        setSubTopicIndex(index);
    }
    const handleSubtopicChange = (index, name, value) => {
        const updatedSubtopics = [...subtopics];
        updatedSubtopics[index] = {
            ...updatedSubtopics[index],
            [name]: value
        }
        setSubtopics(updatedSubtopics)
    }
    const handleSubtopicSave = async () => {
        try {
            const data = await editApi({
                subtopics: subtopics,
                postId: postId
            });
            console.log(data);
            setSubTopicIndex(null);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubtopicCancel = () => {
        const updatedSubtopics = [...subtopics];
        updatedSubtopics[subTopicIndex] = originalSubTopicValue;
        setSubtopics(updatedSubtopics, postId);
        setSubTopicIndex(null);

    }
    const handleDeleteSubtopics = async (index) => {
        // console.log(index);
        await deleteSubtopicApi({ index, postId });
        // console.log(data);
        const updatedSubtopics = [...subtopics];
        updatedSubtopics.splice(index, 1);
        setSubtopics(updatedSubtopics);
    }
    const handleDeletePost = async () => {
        await deltePostApi({ postId: postId });
        navigate('/html')
    }
    const authenticate = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
        }
    }
    useEffect(() => {
        topicDetailFn();
    }, [])
    useEffect(() => {
        authenticate();
    })
    return (
        <div>
            {/* for laptop */}
            <div className='hidden sm:flex'>
                <div className='flex flex-row w-full'>
                    <div className='w-1/12'></div>
                    <div className='w-11/12 h-[900px] overflow-y-auto ml-3 pr-3'>
                        {
                            isLogin &&
                            <i className="ri-delete-bin-5-fill text-4xl flex justify-center cursor-pointer  
                            hover:text-red-600 "
                                onClick={handleDeletePost}
                            ></i>
                        }

                        {/*1. topic name */}
                        <div className='text-xl flex items-center justify-center mt-2 underline text-sky-600'>
                            {
                                isEditing.topicName ?
                                    <>
                                        <input
                                            value={topicName}
                                            type='text'
                                            onChange={(e) => handleChange(setTopicName, e.target.value)}
                                            className='text-xl'
                                        ></input>
                                        <button className='ml-2'
                                            onClick={() => handleSave('topicName', topicName)}
                                        >save</button>
                                        <button className='ml-2'
                                            onClick={() => handleCancel(setTopicName, 'topicName')}
                                        >cancel</button>
                                    </>
                                    : (
                                        <>
                                            {topicName}

                                            {
                                                isLogin &&
                                                <i className="ri-edit-line ml-2 cursor-pointer"
                                                    onClick={() => handleUpdate('topicName', topicName)}
                                                ></i>
                                            }

                                        </>
                                    )
                            }

                            {/* edit1 */}
                        </div>


                        {/*2. topicDetials */}
                        <div className='m-2 text-lg'>
                            {
                                isEditing.topicDetails ?
                                    <div className='flex flex-col'>
                                        <textarea
                                            value={topicDetails}
                                            type='text'
                                            onChange={(e) => handleChange(setTopicDetails, e.target.value)}
                                            rows={10}
                                            className='text-xl'
                                        ></textarea>
                                        <div>
                                            <button className='ml-2 w-20'
                                                onClick={() => handleSave('topicDetails', topicDetails)}
                                            >save</button>
                                            <button className='ml-2 w-20'
                                                onClick={() => handleCancel(setTopicDetails, 'topicDetails')}
                                            >cancel</button>
                                        </div>

                                    </div> : (topicDetails &&
                                        <>
                                            {topicDetails}
                                            {
                                                isLogin &&
                                                <i className="ri-edit-line ml-2 cursor-pointer"
                                                    onClick={() => handleUpdate('topicDetails', topicDetails)}
                                                ></i>
                                            }
                                        </>

                                    )

                            }
                        </div>


                        {/*3. codes */}
                        {
                            isEditing.codes ?
                                <>
                                    <div className='flex flex-col'>
                                        <textarea
                                            value={codes}
                                            type='text'
                                            onChange={(e) => handleChange(setCodes, e.target.value)}
                                            rows={10}
                                            className='text-xl'
                                        ></textarea>
                                        <div>
                                            <button className='ml-2 w-20'
                                                onClick={() => handleSave('codes', codes)}
                                            >save</button>
                                            <button className='ml-2 w-20'
                                                onClick={() => handleCancel(setCodes, 'codes')}
                                            >cancel</button>
                                        </div>

                                    </div>
                                </> :
                                (codes &&
                                    <div>
                                        <CodeHightLighter language="html" code={codes}></CodeHightLighter>
                                        {
                                            isLogin &&
                                            <i className="ri-edit-line ml-2 cursor-pointer"
                                                onClick={() => handleUpdate('codes', codes)}
                                            ></i>
                                        }
                                        {/* edit3 */}
                                        {/* 4.change */}
                                    </div>
                                )
                        }

                        {/* 4.output */}

                        {
                            isEditing.output ?
                                <>
                                    <div className='flex flex-col'>
                                        <textarea
                                            value={output}
                                            type='text'
                                            onChange={(e) => handleChange(setOutput, e.target.value)}
                                            rows={10}
                                            className='text-xl'
                                        ></textarea>
                                        <div>
                                            <button className='ml-2 w-20'
                                                onClick={() => handleSave('output', output)}
                                            >save</button>
                                            <button className='ml-2 w-20'
                                                onClick={() => handleCancel(setOutput, 'output')}
                                            >cancel</button>
                                        </div>

                                    </div>
                                </> :
                                (
                                    output && <div>
                                        <div>output:</div>
                                        <CodeHightLighter language="html" code={output}></CodeHightLighter>
                                        {
                                            isLogin &&
                                            <i className="ri-edit-line ml-2 cursor-pointer"
                                                onClick={() => handleUpdate('output', output)}
                                            ></i>
                                        }
                                        {/* edit4 */}
                                        {/* 5.change */}
                                    </div>

                                )

                        }
                        <div className='m-2 text-lg bg-blue-400'></div>
                        {
                            subtopics?.map((st, index) => (
                                subTopicIndex === index ?
                                    <div key={index}>
                                        <div className='flex flex-row '>
                                            <label htmlFor={`subtopicName-${index}`} className="text-xl flex justify-center">
                                                Subtopic{index + 1} Name
                                            </label>
                                            <input
                                                type="text"
                                                id={`subtopicName-${index}`}
                                                name={`subtopicName-${index}`}
                                                value={st.name}
                                                className='ml-2 w-1/2 '
                                                onChange={(e) => handleSubtopicChange(index, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col mt-1'>
                                            <label htmlFor={`subtopicDetails-${index}`} className="text-2xl flex justify-center">
                                                Subtopic {index + 1} Details
                                            </label>
                                            <textarea
                                                id={`subtopicDetails-${index}`}
                                                name={`subtopicDetails-${index}`}
                                                value={st.details}
                                                rows={20}
                                                onChange={(e) => handleSubtopicChange(index, 'details', e.target.value)}
                                                className=''
                                            />
                                        </div>
                                        <div className='flex flex-col mt-1'>
                                            <label htmlFor={`code-${index}`} className="text-2xl flex justify-center">
                                                code {index + 1}
                                            </label>
                                            <textarea
                                                id={`code-${index}`}
                                                name={`code-${index}`}
                                                value={st.code}
                                                rows={20}
                                                onChange={(e) => handleSubtopicChange(index, 'code', e.target.value)}
                                                className=''
                                            />
                                        </div>
                                        <div className='flex flex-col mt-1'>
                                            <label htmlFor={`code-${index}`} className="text-2xl flex justify-center">
                                                output {index + 1}
                                            </label>
                                            <textarea
                                                id={`output-${index}`}
                                                name={`output-${index}`}
                                                value={st.output}
                                                rows={5}
                                                onChange={(e) => handleSubtopicChange(index, 'output', e.target.value)}
                                                className=''
                                            />
                                        </div>
                                        <div className='flex flex-row'>
                                            <button className='h-14 m-2 w-28'
                                                onClick={handleSubtopicSave}
                                            >save</button>
                                            <button onClick={handleSubtopicCancel} className='h-14 m-2 w-28'
                                                onAuxClick={handleSubtopicCancel}
                                            >cancel</button>
                                        </div>

                                    </div>
                                    :
                                    <div key={index} className='mt-10'>
                                        {
                                            isLogin && <>
                                                <i className="ri-edit-line ml-2 cursor-pointer text-2xl "
                                                    onClick={() => handleSubtopicIndex(index)}
                                                ></i>
                                                <i className="ri-delete-bin-line cursor-pointer text-2xl hover:text-red-600 ml-4"
                                                    onClick={() => handleDeleteSubtopics(index)}
                                                ></i>
                                            </>
                                        }

                                        <div className='m-1  text-blue-700 text-xl flex justify-center'>{st.name}
                                            {/* edit5 */}
                                        </div>
                                        <div className='m-1 '>{st.details}

                                        </div>
                                        {st.code &&
                                            <div>
                                                <CodeHightLighter language="html" code={st.code}></CodeHightLighter>

                                                {/*6. change    */}
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