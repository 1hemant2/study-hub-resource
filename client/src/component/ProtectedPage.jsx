import { Footer, Header } from 'antd/es/layout/layout'
import React, { useState } from 'react';
import Searchs from '../Pages/Searchs/Searchs';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = ({ children }) => {
    const navigate = useNavigate();
    const [mobileMenu, setmobileMenu] = useState(false);
    return (
        <div>
            <header className='bg-gray-50 w-full '>
                <div className='flex flex-row'>

                    <div className='flex items-center justify-start  ml-10 text-red-500 w-1/5 text-3xl '>
                        Study Hub
                    </div>
                    {/* search */}

                    <div className='w-3/5 flex justify-center items-center'>
                        <Searchs></Searchs>
                    </div>
                </div>
                <div className='text-4xl w-1/5 flex justify-end items-center' onClick={
                    () => {
                        setmobileMenu(!mobileMenu);
                    }
                }>
                    <i className="ri-menu-line"></i>
                </div>
                <div >
                    {
                        mobileMenu ? (<div className='flex flex-col items-center '>
                            <div className='m-2 text-lg cursor-pointer text-blue-700 '
                                onClick={() => {
                                    navigate('/')
                                }}
                            >Home</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700'
                                onClick={() => {
                                    navigate('/htmls')
                                }}
                            >HTML</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700'
                                onClick={() => {
                                    navigate('/csss')
                                }}
                            >CSS</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700 '
                                onClick={() => {
                                    navigate('/javascripts')
                                }}
                            >JavaScript</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700'
                                onClick={() => {
                                    navigate('/reacts')
                                }}
                            >React</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700'
                                onClick={() => {
                                    navigate('/mysql')
                                }}
                            >MySql</div>
                        </div>) : null
                    }
                </div>

            </header>
            <main>
                <div className='min-h-screen'>{children}</div>
            </main>
            <Footer>
                <div className='text-xl flex justify-center items-center '>@copyright 2024 Hemant</div>
            </Footer>
        </div>
    )
}

export default ProtectedPage