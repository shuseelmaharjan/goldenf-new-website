import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import unknown from '../../images/bgg.jpg';
import { capitalizeWords } from '../Utils/TextUtils';
import { FaRegClock } from "react-icons/fa";
import './Style.css';

const CoursesDetails = () => {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
          try {
            const response = await apiClient.get(`/api/courses/${slug}/`);
            setCourse(response.data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCourse();
        window.scrollTo(0, 0); 
      }, [slug]);

      if (loading) {
        return (
          <>
            <Loader/>
          </>
        );
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!course) {
        return <div>No data found for this course.</div>;
      }
  return (
    <>
      <div className="relative text-center">
      {/* Overlay */}
      <div className="absolute inset-x-0 top-0 h-32 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4">
        <div className="breadcrumb absolute text-white flex justify-center align-center space-x-2 mt-10">
          <Link to="/" className="text-white">Home</Link>
          <span>/</span>
          <Link to="/courses" className="text-white">Courses</Link>
          <span>/</span>
          <span>{capitalizeWords(course.title)}</span>
        </div>
      </div>
      {/* Image */}
      <img
        src={`${apiClient.defaults.baseURL}${course.image}` || unknown}
        alt={course.title}
        className="w-full h-32 object-cover mb-5"
      />
      <div className="container mx-auto px-4 text-left">
        <h2 className="text-gray z-10" style={{fontSize:'1.2rem'}}>
          <strong className='text-gray mr-1'>
            Course Title:
          </strong>
          {capitalizeWords(course.title)}
          </h2>
          <p className="text-gray-600 flex items-center mb-5 z-10">
            <strong className="flex items-center mr-2 text-gray-800">
              <FaRegClock className="mr-1" />
              Duration:
            </strong>
            {course.duration}
          </p>
          <div
        className="prose custom-list" style={{ fontSize: '1rem', lineHeight: '1' }}
        dangerouslySetInnerHTML={{ __html: course.description }}
      />
      </div>
    </div>
    </>
  )
}

export default CoursesDetails
