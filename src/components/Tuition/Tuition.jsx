import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { capitalizeWords } from '../Utils/TextUtils';
import Loader from '../Loader/Loader';

const Tuition = () => {
  const [showDescription, setShowDescription] = useState({});
  const [tuitionData, setTuitionData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await apiClient.get('/api/tuition-lists/');
        setTuitionData(response.data);
        const initialShowDescriptionState = {};
        response.data.forEach(item => {
          initialShowDescriptionState[item.id] = false;
        });
        setShowDescription(initialShowDescriptionState);
        
        const adResponse = await apiClient.get('/api/get-random-ads2/');
        if (adResponse.data) {
          setAdData(adResponse.data); 
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const toggleDescription = (id) => {
    setShowDescription(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  window.scrollTo(0, 0);
  
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">Tuition</h3>
          <div className="mx-auto mt-2 w-12 h-1 bg-[#f29200]"></div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-9/12">
            {tuitionData.map((course) => (
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

          <div className="w-full lg:w-3/12 mt-6 lg:mt-0 px-4">
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
    </>
  );
};

export default Tuition;
