import React from 'react';
import a1 from '../../assets/a1.svg'

const AdminHome = ({ username }) => {
    return (
        <div className='bg-gray-100 h-screen'>
            <div className='flex justify-center items-center '>
                <img src={a1} alt="avatage image" height={600} width={600} />
            </div>
            <div className='text-4xl flex justify-center'>hello {username ? username : 'admin'} </div>
        </div>
    )
}

export default AdminHome;