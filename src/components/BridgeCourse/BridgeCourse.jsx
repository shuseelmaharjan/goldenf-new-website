import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';
import Loader from '../Loader/Loader';
import { capitalizeWords } from '../Utils/TextUtils';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

const BridgeCourse = () => {
  const [bridgeCourse, setBridgeCourse] = useState([]); 
  const [showDescription, setShowDescription] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        const response = await apiClient.get('/api/bridge-courses/');
        setBridgeCourse(response.data);
        const initialShowDescriptionState = {};
        response.data.forEach(item => {
          initialShowDescriptionState[item.id] = false;
        });
        setShowDescription(initialShowDescriptionState);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const toggleDescription = (id) => {
    setShowDescription(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  if (loading) {
    return <Loader />; 
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">Bridge Course</h3>
          <div className="mx-auto mt-2 w-12 h-1 bg-[#f29200]"></div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-9/12">
            {bridgeCourse.map((course) => (
              <div key={course.id} className="mb-4">
                <div className={`shadow-md p-4 border rounded-lg transition-all duration-300 ${showDescription[course.id] ? 'bg-gray-100' : ''}`}>
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDescription(course.id)}>
                    <h4 className="text-xl font-semibold">{capitalizeWords(course.title)}</h4>
                    {showDescription[course.id] ? <FaArrowDown /> : <FaArrowUp />}
                  </div>
                  {showDescription[course.id] && (
                    <div className="mt-3">
                      <p dangerouslySetInnerHTML={{ __html: course.description }}></p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default BridgeCourse;