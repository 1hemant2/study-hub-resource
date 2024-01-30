import React from 'react'
import { useState } from 'react'
import { CreatePostApi } from '../../Api/subjectApi';
import { Button, Modal } from 'antd'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
// how to add subtopic dynamically 
/*1.create empty array, 
  2.when click on the addsubtopic , 
  3.handle subtopic function will be called 
  4.when it is add an empty thing like '' in array , you can also add count 
  5.now size of array is not empty it will itterate the array 
  6.it will show the label and input tag in the pages 
  7.write a function to handle the changes 
*/
const CreatePost = () => {
    const [data, setData] = useState({});
    const [selectedOption, setSelectedOption] = useState('');
    const [subtopics, setSubtopics] = useState([{}]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    function handleChange(e) {
        // console.log(e.target.name, e.target.value)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        if (e.target.type === 'radio') {
            setSelectedOption(e.target.value);
            setSubtopics([]);
        }
    }
    const handleAddSubtopic = () => {
        // Add a new empty subtopic field
        setSubtopics([...subtopics, {}]);
    };
    const handleSubtopicChange = (index, property, value) => {
        // Update the subtopics array based on user input
        const updatedSubtopics = [...subtopics];
        updatedSubtopics[index] = {
            ...updatedSubtopics[index],
            [property]: value,
        };
        setSubtopics(updatedSubtopics);
    };
    const handleDeleteSubtopics = (indexToRemove) => {
        const newSubtopics = subtopics.filter((_, index) => index !== indexToRemove);
        setSubtopics(newSubtopics);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            'initialData': data,
            'subtopics': subtopics,
        }
        // setData({ ...data, 'subtopics': subtopics });
        const response = await CreatePostApi(updatedData);
        setData({});
        setSubtopics([{}]);
        if (response.success) {
            setTimeout(() => {
                success();
            }, 1000);
            navigate('/html')
        }
        console.log(response);
    }
    return (
        <div className='bg-slate-300 overflow-y-auto h-screen '>
            {contextHolder}
            <div className='modal flex justify-end'>
                <Button type="" className='bg-slate-600 text-white' onClick={showModal}>
                    FILL DATA ?
                </Button>
                <Modal title="rule to fill the data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                    <p className='text-2xl'>1.add subtopic on click subtopic button</p>
                    <p className='text-2xl'>2.if subtopic had code make sure subtopic name and code name will same</p>
                    <p className='text-2xl'>3.click on create post button to create post</p>
                </Modal>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col ml-3'>
                    <label htmlFor="subject" className='text-2xl '>subject</label>
                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="html"
                            checked={selectedOption === 'html'}
                            onChange={handleChange}
                        />
                        html
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="css"
                            checked={selectedOption === 'css'}
                            onChange={handleChange}
                        />
                        css
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="javascript"
                            checked={selectedOption === 'javascript'}
                            onChange={handleChange}
                        />
                        javascript
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="react"
                            checked={selectedOption === 'react'}
                            onChange={handleChange}
                        />
                        react
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="mysql"
                            checked={selectedOption === 'mysql'}
                            onChange={handleChange}
                        />
                        MySql
                    </label>
                </div>
                <hr />
                <label htmlFor="topicName" className='ml-2 text-2xl'>topicname</label>
                <input type="text" name='topicName' className='h-5 m-2 w-1/2'
                    onChange={handleChange}
                />
                <hr />
                <div className=' flex flex-col m-5'>
                    <label htmlFor="topicDetails" className='text-2xl flex justify-center'>topic Details</label>
                    <textarea type="text" rows={20} name='topicDetails' onChange={handleChange} />
                </div>

                <hr />
                <div className=' flex flex-col m-5'>
                    <label htmlFor="topicDetails" className='text-2xl flex justify-center'>code</label>
                    <textarea type="text" rows={20} name='code' onChange={handleChange} />
                </div>
                <div className=' flex flex-col m-5 '>
                    <label htmlFor="topicDetails" className='text-2xl flex justify-center'>output</label>
                    <textarea type="text" rows={5} name='output' onChange={handleChange} />
                </div>

                <hr />
                <div className='flex flex-col m-10'>

                    {/* Dynamically render input fields for subtopics */}
                    {subtopics.map((subtopic, index) => (
                        <div key={index} className='mt-8 border border-solid border-black p-4'>
                            <div className='text-5xl flex justify-center mb-4'

                            >
                                <i className="ri-delete-bin-line cursor-pointer"
                                    onClick={() => handleDeleteSubtopics(index)}>

                                </i>
                            </div>
                            <div className='flex flex-row '>
                                <label htmlFor={`subtopicName-${index}`} className="text-xl flex justify-center">
                                    Subtopic{index + 1} Name
                                </label>
                                <input
                                    type="text"
                                    id={`subtopicName-${index}`}
                                    name={`subtopicName-${index}`}
                                    value={subtopic.name}
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
                                    value={subtopic.details}
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
                                    value={subtopic.code}
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
                                    value={subtopic.output}
                                    rows={5}
                                    onChange={(e) => handleSubtopicChange(index, 'output', e.target.value)}
                                    className=''
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-row space-x-2 m-2 justify-center'>
                    <div className='bg-slate-400 w-28 h-8 flex items-center justify-center cursor-pointer' onClick={handleAddSubtopic}>add sub topics
                    </div>
                </div>
                <hr />
                <div className='m-5'>
                    <label htmlFor="" className='text-2xl flex justify-center '>resource download link</label>
                    <input type="url" name='downloadResource' onChange={handleChange} className=' h-5 w-full' />
                </div>
                <hr />
                <div className='w-full flex justify-center mb-20'>
                    <button type='submit' className='h-10 w-52 mt-2 bg-slate-500 cursor-pointer'>create Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost