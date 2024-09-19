import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import apiClient from '../../apiClient';
import unknown from '../../images/unknown.gif';
import { PopularCourseLoader } from '../Loader/PopularCourseLoader';
import { FaRegClock } from "react-icons/fa6";
import { capitalizeWords } from '../../utils/TextUtils';

export const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/computercourses/popular/');
        const modifiedData = response.data.map(course => ({
          ...course,
          image: course.image ? `${apiClient.defaults.baseURL}${course.image}` : null
        }));
        setCourses(modifiedData);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <PopularCourseLoader />;
  }

  return (
    <div className="container mx-auto mt-6 py-6">
      <div className="text-center mb-6">
        <h5 className="text-gray-600">Start Now</h5>
        <h3 className="text-xl font-semibold">Popular Courses</h3>
        <div className="mx-auto mt-2 w-12 h-1 bg-orange-500"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="relative border bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <span className="absolute top-0 right-0 text-white text-sm font-semibold px-3 py-1 z-10" style={{background:'#f29200'}}>Popular</span>
            <Link to={`/courses/${course.slug}`} className="block no-underline text-black">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={course.image || unknown}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold h-10 overflow-hidden text-center">{capitalizeWords(course.title)}</h4>
                <p className="text-l flex items-center">
                  <FaRegClock className="mr-1" />
                  <span className="mx-1 font-semibold">Duration:</span>
                  {capitalizeWords(course.duration)}
                </p>              
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
