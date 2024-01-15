import { Footer, Header } from 'antd/es/layout/layout'
import React from 'react';
import Searchs from '../Pages/Searchs/Searchs';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = ({ children }) => {
    const navigate = useNavigate();
    return (
        <div>
            <Header className='bg-gray-50 flex flex-row w-full '>
                {/* subjects */}

                <div className='flex flex-row items-center w-6/12'>
                    <div className='m-2 text-lg cursor-pointer text-blue-700'
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
                </div>
                <div className='flex items-center  ml-10 text-red-500 w-3/12 text-3xl '>
                    Study Hub
                </div>
                {/* search */}
                <div className='flex justify-end items-center w-3/12 mt-5 sm:w-1/2'>
                    <div >
                        <Searchs></Searchs>
                    </div>

                </div>
            </Header>
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