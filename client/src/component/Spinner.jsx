import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Spinner = () => {
    return (
        <div className='h-screen flex justify-center items-center bg-slate-200'>
            <Spin
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 52,
                        }}
                        spin
                    />
                }
            />
        </div>
    )
}

export default Spinner;