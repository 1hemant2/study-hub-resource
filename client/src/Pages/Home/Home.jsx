import React from 'react'
import { Carousel } from 'antd';
import i1 from '../../assets/i1.jpg';
import i2 from '../../assets/i2.jpg';
import i3 from '../../assets/i3.jpg';
import i4 from '../../assets/i4.jpg';

const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Home = () => {
    return (
        <div className='overflow-y-auto h-screen'>
            <Carousel autoplay effect='fade'>
                <div>
                    <h3 style={contentStyle}>
                        <img src={i1} alt="study image" height={300} width={2000} />
                        {/* {console.log(i1)} */}
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src={i2} alt="study image" height={300} width={2000} />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src={i3} alt="study image" height={300} width={2000} />
                    </h3>
                </div>
                <div>
                    <img src={i4} alt="study image" height={300} width={2000} />
                </div>
            </Carousel>
            <div className='bg-gray-200'>
                <div className='text-2xl flex items-end justify-center m-2' >Our mission</div>
                <div className=' text-lg ml-2 mr-1'>
                    "At <span className='text-red-500'>STUDY HUB</span> our goal is to democratize education by providing free and accessible study materials to learners worldwide. We believe that knowledge should be freely available to all, irrespective of geographical, economic, or social barriers. Our mission is to empower individuals to pursue their educational aspirations by offering a diverse range of high-quality study resources.

                    Through the collective efforts of educators, contributors, and the support of our community, we aim to create a platform that fosters a culture of open learning. We envision a world where education is not confined by financial constraints, and every individual has the opportunity to enhance their skills, broaden their horizons, and achieve their academic goals.

                    We are committed to promoting inclusivity, collaboration, and the free exchange of knowledge. By leveraging technology, embracing open educational resources, and encouraging a global community of learners, <span className='text-red-500'>STUDY HUB</span> seeks to contribute to a more equitable and accessible educational landscape.
                    <br></br>
                    Join us in our mission to make education a universal right, and together, let's build a future where learning knows no bounds."
                    "
                </div>
            </div>
            <div className='text-base bg-slate-100 mt-2 mb-20'>
                <div className='text-2xl flex items-center justify-center'>subjects</div>
                <ul className='ml-6 text-blue-500 cursor-pointer'>
                    <li >HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Apptitude</li>
                    <li>mysql</li>
                </ul>
            </div>
        </div>
    )
}

export default Home