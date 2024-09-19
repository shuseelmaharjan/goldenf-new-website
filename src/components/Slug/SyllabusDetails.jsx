import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import unknown from '../../images/bgg.jpg';
import { capitalizeWords } from '../../utils/TextUtils';
import './Style.css';

const SyllabusDetails = () => {
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
                const response = await apiClient.get(`/api/syllabus-details/${slug}/`);
                setCourse(response.data);
                setLoading(false);
                //for ads fetch
                const adResponse = await apiClient.get('/api/get-random-ads1/');
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
                    src={unknown} 
                    alt={course.coursetitle} 
                    className="w-full h-32 object-cover"
                    onContextMenu={(e) => e.preventDefault()} 
                    draggable="false"
                />
                {/* Overlay with Breadcrumbs */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start">
                    <div className="container mx-auto px-4 breadcrumb text-white flex justify-left align-center space-x-2">
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/syllabus" className="hover:text-gray-300">Syllabus</Link>
                        <span className="mx-2">/</span>
                        <span>{capitalizeWords(course.coursetitle)}</span>
                    </div>
                </div>
            </div>

            {/* Course Info Section */}
            <div className="container mx-auto px-4 py-8 block">
                <div className="text-left mb-6">
                    <h1 className="text-2xl font-bold mb-2 ">{capitalizeWords(course.coursetitle)}</h1>
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-4">
                    <div className="w-full lg:w-4/5 lg:order-1 mb-3">
                        <div className="custom-list" dangerouslySetInnerHTML={{ __html: course.description }}/>
                    </div>

                    <div className="w-full lg:w-1/5 lg:sticky lg:top-0 mb-4 lg:mb-0 lg:order-2 py-3 mt-4">
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

export default SyllabusDetails;
