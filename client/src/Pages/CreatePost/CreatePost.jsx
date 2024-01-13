import React from 'react'
import { useState } from 'react'
import { CreatePostApi } from '../../Api/subjectApi';

const CreatePost = () => {
    const [data, setData] = useState({});
    const [selectedOption, setSelectedOption] = useState('');
    function handleChange(e) {
        console.log(e.target.name, e.target.value)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        const response = await CreatePostApi(data);
        console.log(response);
        setData({});
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="subject">subject</label>
                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="html"
                            checked={selectedOption === 'option1'}
                            onChange={handleChange}
                        />
                        HTML
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="css"
                            checked={selectedOption === 'option2'}
                            onChange={handleChange}
                        />
                        css
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="javascript"
                            checked={selectedOption === 'option3'}
                            onChange={handleChange}
                        />
                        javascript
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="react"
                            checked={selectedOption === 'option3'}
                            onChange={handleChange}
                        />
                        react
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="subject"
                            value="mysql"
                            checked={selectedOption === 'option3'}
                            onChange={handleChange}
                        />
                        MySql
                    </label>
                </div>
                <br />
                <label htmlFor="topicName">topicname</label>
                <input type="text" name='topicName'
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="topicDetails">topic Details</label>
                <textarea type="text" rows={20} cols={70} name='topicDetails' onChange={handleChange} />
                <br />
                <label htmlFor="">resource download link</label>
                <input type="url" name='downloadResource' onChange={handleChange} />
                <br />
                <button type='submit' >create data</button>
            </form>
        </div>
    )
}

export default CreatePost