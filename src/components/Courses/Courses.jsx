import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';
import { Link } from 'react-router-dom'; 
import slugify from 'slugify'; 
import unknown from '../../images/bgg.jpg';
import Loader from '../Loader/Loader';
import { capitalizeWords } from '../Utils/TextUtils';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [displayData, setDisplayData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await apiClient.get('/api/computercourses/');
              const modifiedData = response.data.map(course => {
                const slug = slugify(course.title, { lower: true });
                return {
                  ...course,
                  slug: slug, 
                  image: course.image ? `${apiClient.defaults.baseURL}${course.image}` : null
                };
              });
              setCourses(modifiedData);
              setLoading(false); 
            } catch (error) {
              console.error('Error fetching data', error);
            }
        };
          
        fetchData();
        window.scrollTo(0, 0); 
        const timer = setTimeout(() => {
            setDisplayData(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading || !displayData) {
        return (
            <>
            <Loader/>
            </>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold">Courses We Offer</h3>
                <div className="mx-auto mt-2 w-12 h-1 bg-[#f29200]"></div>
            </div>    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <Link 
                        key={index} 
                        to={`/courses/${course.slug}`} 
                        className={`block border rounded-lg overflow-hidden transition-shadow duration-300 ${hoveredIndex === index ? 'shadow-lg' : 'shadow-sm'}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="relative">
                            <img 
                                src={course.image || unknown} 
                                alt={capitalizeWords(course.title)} 
                                className="w-full h-60 object-cover rounded-t-lg"
                                onContextMenu={(e) => e.preventDefault()} 
                                draggable="false" 
                            />
                        </div>
                        <div className="p-4">
                            <h5 className="text-lg font-semibold text-center mb-2">{capitalizeWords(course.title)}</h5>
                            <p><strong>Duration:</strong> {capitalizeWords(course.duration)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Courses;
