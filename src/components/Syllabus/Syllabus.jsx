import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../apiClient';
import Loader from '../Loader/Loader';
import { capitalizeWords } from '../Utils/TextUtils';

const Syllabus = () => {
  const [syllabusItems, setSyllabusItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await apiClient.get('/api/get-all-syllabus/');
        setSyllabusItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0); 
  }, []);

  if (loading) {
    return (<Loader/>);
  }

  return (
    <>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-3">
            <h3 className="text-2xl font-semibold">Syllabus</h3>
            <div className="mx-auto mt-2 w-12 h-1 bg-[#f29200]"></div>
          </div>

          <div className="flex justify-start mt-3">
            <h5 className="text-lg font-medium">Courses Syllabus</h5>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
            {syllabusItems.map((item) => (
              <Link
                key={item.id}
                to={`/syllabus/${item.slug}`}
                className="block p-4 bg-orange-300 hover:bg-orange-400 rounded-lg text-center"
              >
                {capitalizeWords(item.coursetitle)}
              </Link>
            ))}
          </div>
        </div>
    </>
  );
};
export default Syllabus;