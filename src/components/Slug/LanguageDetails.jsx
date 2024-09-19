import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import unknown from '../../images/bgg.jpg';
import { capitalizeWords } from '../../utils/TextUtils';
import { FaRegClock } from "react-icons/fa";
import './Style.css';

const LanguageDetails = () => {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adData, setAdData] = useState([]);


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                //for courses details
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await apiClient.get(`/api/courses/${slug}/`);
                setCourse(response.data);
                setLoading(false);
                //for ads fetch
                const adResponse = await apiClient.get('/api/get-random-ads2/');
                if (adResponse.data) {
                setAdData(adResponse.data); 
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        window.scrollTo(0, 0);
        fetchCourse();
    }, [slug]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!course) {
        return <div>No data found for this course.</div>;
    }
    return (
        <div className="relative">
            {/* Image Section */}
            <div className="relative w-full">
                <img 
                    src={`${apiClient.defaults.baseURL}${course.image}` || unknown} 
                    alt={course.title} 
                    className="w-full h-32 object-cover"
                    onContextMenu={(e) => e.preventDefault()} 
                    draggable="false"
                />
                {/* Overlay with Breadcrumbs */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start">
                    <div className="container mx-auto px-4 breadcrumb text-white flex justify-left align-center space-x-2">
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/languages" className="hover:text-gray-300">Languages</Link>
                        <span className="mx-2">/</span>
                        <span>{capitalizeWords(course.title)}</span>
                    </div>
                </div>
            </div>

            {/* Course Info Section */}
            <div className="container mx-auto px-4 py-8 block">
                <div className="text-left mb-6">
                    <h1 className="text-2xl font-bold mb-2 ">{capitalizeWords(course.title)}</h1>
                </div>
                <div className="flex items-center text-lg">
                    <span className='flex items-center'>
                        <FaRegClock className="mr-2" />
                        <span className="font-semibold mr-2">Duration:</span> {capitalizeWords(course.duration)}
                    </span>
                </div>
                
                <div className="flex flex-col-reverse lg:flex-row lg:space-x-4">
                    <div className="w-full lg:w-4/5 lg:order-1">
                        <div className="custom-list" dangerouslySetInnerHTML={{ __html: course.description }}/>
                    </div>

                    <div className="w-full lg:w-1/5 lg:sticky lg:top-0 mb-4 lg:mb-0 lg:order-2 py-3">
                        {adData.map((item) => (
                        <div key={item.id} className="mb-4">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <img 
                                src={`${apiClient.defaults.baseURL}${item.image}`} 
                                alt={item.title} 
                                className="w-full rounded-lg shadow-lg" 
                            />
                            </a>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LanguageDetails;
