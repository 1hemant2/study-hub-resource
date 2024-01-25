import React, { useState } from 'react';
import Searchs from '../Pages/Searchs/Searchs';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = ({ children }) => {
    const navigate = useNavigate();
    const [mobileMenu, setmobileMenu] = useState(false);
    return (
        <div className='h-screen overflow-y-hidden'>
            {/* for mobile */}
            <header className={`bg-gray-50 w-full flex ${mobileMenu ? 'flex-col' : 'flex-row sm:hidden'}`}>
                <div className={`flex items-center justify-start ml-10 text-red-500 w-1/5 text-3xl ${mobileMenu ? 'hidden' : 'none'}`}>
                    Study Hub
                </div>
                {/* search */}

                <div className={`w-3/5 flex justify-center items-center ${mobileMenu ? 'hidden' : 'none'}`}>                        <Searchs></Searchs>
                </div>

                <div className={`text-4xl  flex justify-end items-center ${mobileMenu ? 'w-full' : 'w-1/5'} `} onClick={
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
                                    setmobileMenu(!mobileMenu);
                                }}
                            >Home</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700'
                                onClick={() => {
                                    navigate('/html')
                                    setmobileMenu(!mobileMenu);
                                }}
                            >HTML</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700'
                                onClick={() => {
                                    navigate('/css')
                                    setmobileMenu(!mobileMenu);
                                }}
                            >CSS</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700 '
                                onClick={() => {
                                    navigate('/javascript')
                                    setmobileMenu(!mobileMenu);
                                }}
                            >JavaScript</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700'
                                onClick={() => {
                                    navigate('/react')
                                    setmobileMenu(!mobileMenu);
                                }}
                            >React</div>
                            <div className='m-2 text-lg cursor-pointer text-blue-700'
                                onClick={() => {
                                    navigate('/mysql')
                                    setmobileMenu(!mobileMenu);
                                }}
                            >MySql</div>
                        </div>) : null
                    }
                </div>

            </header>

            {/* for laptop */}
            <header className={`hidden sm:flex`}>
                <div className='bg-gray-50 w-full flex flex-row'>
                    <div className={`flex items-center justify-start ml-10 text-red-500 w-1/5 text-3xl`}
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        Study Hub
                    </div>

                    <div className='flex flex-row items-center mr-4 w-3/5 space-x-5'>
                        <div className='m-2 text-lg cursor-pointer text-blue-700 '
                            onClick={() => {
                                navigate('/')
                            }}
                        >Home</div>
                        <div className='m-2 text-lg cursor-pointer text-blue-700'
                            onClick={() => {
                                navigate('/html')
                            }}
                        >HTML</div>
                        <div className='m-2 text-lg cursor-pointer text-blue-700'
                            onClick={() => {
                                navigate('/css')
                            }}
                        >CSS</div>
                        <div className='m-2 text-lg cursor-pointer text-blue-700 '
                            onClick={() => {
                                navigate('/javascript')
                            }}
                        >JavaScript</div>
                        <div className='m-2 text-lg cursor-pointer text-blue-700'
                            onClick={() => {
                                navigate('/react')
                            }}
                        >React</div>
                        <div className='m-2 text-lg cursor-pointer text-blue-700'
                            onClick={() => {
                                navigate('/mysql')
                            }}
                        >MySql</div>
                    </div>

                    {/* search */}

                    <div className={` flex justify-center items-center `}>
                        <Searchs></Searchs>
                    </div>
                </div>

            </header>

            <main >
                <div className=''>{children}</div>
            </main>
            <footer className='mt-7'>
                <div className='text-xl flex justify-center items-center  fixed bottom-0 bg-slate-100 w-full'>@copyright 2024 Hemant</div>
            </footer>
        </div>
    )
}

export default ProtectedPage;