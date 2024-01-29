import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { loginApi } from '../../Api/userApi';
import { message } from 'antd';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [messageApi, contextHolder] = message.useMessage();
    const errorMessage = (error) => {
        messageApi.open({
            type: 'error',
            content: error,
        });
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        // console.log(data);
        try {
            e.preventDefault();
            const res = await loginApi({ data });
            setData({});
            if (res.success) {
                localStorage.setItem("token", res.data);
                navigate('/admin');
            }
            console.log(res);
        } catch (error) {
            errorMessage(error);
            console.log(error);
        }
    }

    return (
        <div className='bg-[#47a8b3] h-screen flex justify-center items-center'>
            {contextHolder}
            <div className='flex  flex-col ' >
                <div className='text-4xl  m-4 flex justify-center'>Login</div>
                <form className='flex flex-col' action='post' onSubmit={handleSubmit}>
                    <input type="text" placeholder='username or email' name='username' className='h-5 w-56 mb-2 p-2 ' required
                        onChange={(e) => handleChange(e)}
                    />
                    <input type="password" placeholder='password' name='password' className='h-5 w-56 mb-2 p-2' required
                        onChange={(e) => handleChange(e)}
                    />
                    <button className='h-10 w-56 ml-2 p-2' type='submit'>submit</button>
                </form >
                <p className='p-2'>don't have an account ?<span className=' underline ml-2 hover:text-red-400 cursor-pointer'
                    onClick={() => navigate('/signpu')}
                >login</span></p>
            </div>

        </div>
    )
}

export default Login;