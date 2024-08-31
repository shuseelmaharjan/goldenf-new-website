import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import unknown from '../../images/bgg.jpg';
import { capitalizeWords } from '../Utils/TextUtils';
import { FaRegClock } from "react-icons/fa";
import './Style.css';

const CoursesDetails = () => {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayData, setDisplayData] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiClient.get(`/api/computercourses/${slug}/`);
                setCourse(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setDisplayData(true); 
            }
        };

        fetchCourse();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading || !displayData) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!course) {
        return <div>No data found for this course.</div>;
    }

    return (
        <div className="relative text-center">
            <div>
                <div className="absolute inset-x-0 top-0 h-32 bg-black bg-opacity-50"></div>
                <div className="container mx-auto px-4">
                    <div className="breadcrumb absolute text-white flex justify-center align-center space-x-2 mt-4 mx-auto">
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                        <span className="text-white mx-2">/</span>
                        <Link to="/courses" className="hover:text-gray-300">Courses</Link>
                        <span className="text-white mx-2">/</span>
                        <span>{capitalizeWords(course.title)}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="col-span-1">
                            <img 
                                src={course.image || unknown} 
                                alt={course.title} 
                                className="w-full h-64 object-cover rounded-lg"
                                onContextMenu={(e) => e.preventDefault()} 
                                draggable="false"
                            />
                        </div>
                        <div className="col-span-2">
                            <h1 className="text-3xl font-bold mb-4">{capitalizeWords(course.title)}</h1>
                            <p className="text-lg mb-4">{capitalizeWords(course.description)}</p>
                            <p className="text-lg flex items-center">
                                <FaRegClock className="mr-1" />
                                <span className="font-semibold">Duration:</span> {capitalizeWords(course.duration)}
                            </p>
                            <p className="text-lg flex items-center">
                                <FaRegClock className="mr-1" />
                                <span className="font-semibold">Fee:</span> {course.fee}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursesDetails;
