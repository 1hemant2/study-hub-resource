import React from 'react'
import { Skeleton } from 'antd';
// import { Button, Spin } from 'antd';

const Loader = () => {
    return (
        <div >
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
        </div>
    )
}

export default Loader;