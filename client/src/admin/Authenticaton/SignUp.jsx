import React from 'react'
import { useState } from 'react';
import { signupApi } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';


const SignUp = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'account created successfully',
        });
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        // console.log(data);
        try {
            e.preventDefault();
            const res = await signupApi({ data });
            setData({});
            if (res.success) {
                success();
                setTimeout(() => {
                    navigate('/login');
                }, 1000)
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='bg-[#47a8b3] h-screen flex justify-center items-center'>
            {contextHolder}
            <div className='flex  flex-col ' >
                <div className='text-4xl  m-4 flex justify-center'>register</div>
                <form className='flex flex-col' action='post' onSubmit={handleSubmit}>
                    <input type="text" placeholder='username ' name='username' className='h-5 w-56 mb-2 p-2 ' required
                        onChange={(e) => handleChange(e)}
                    />
                    <input type="text" placeholder='email ' name='email' className='h-5 w-56 mb-2 p-2'
                        required
                        onChange={(e) => handleChange(e)}
                    />
                    <input type="password" placeholder='password' name='password' className='h-5 w-56 mb-2 p-2' required
                        onChange={(e) => handleChange(e)}
                    />
                    <button className='h-10 w-56 ml-2 p-2' type='submit'>submit</button>
                </form >
                <p className='p-2'>already have an accout ?<span className=' underline ml-2 hover:text-red-400 cursor-pointer'
                    onClick={() => navigate('/login')}
                >loin</span></p>
            </div>
        </div>
    )
}

export default SignUp