import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';
import { Link } from 'react-router-dom'; 
import slugify from 'slugify'; 
import unknown from '../../images/bgg.jpg';
import Loader from '../Loader/Loader';
import { capitalizeWords } from '../Utils/TextUtils';
import { FaRegClock } from "react-icons/fa6";

const Languages = () => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
              await new Promise(resolve => setTimeout(resolve, 1000));
              const response = await apiClient.get('/api/languagecourses/');
              const modifiedData = response.data.map(language => {
                const slug = slugify(language.title, { lower: true });
                return {
                  ...language,
                  slug: slug, 
                  image: language.image ? `${apiClient.defaults.baseURL}${language.image}` : null
                };
              });
              setLanguages(modifiedData);
              setLoading(false); 
            } catch (error) {
              console.error('Error fetching data', error);
            }
        };
          
        fetchData();
        window.scrollTo(0, 0); 
    }, []);

    if (loading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold">Language Classes</h3>
                <div className="mx-auto mt-2 w-12 h-1 bg-[#f29200]"></div>
            </div>    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {languages.map((language, index) => (
                    <Link 
                        key={index} 
                        to={`/languages/${language.slug}`} 
                        className={`block border rounded-lg overflow-hidden transition-shadow duration-300 ${hoveredIndex === index ? 'shadow-lg' : 'shadow-sm'}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="relative">
                            <img 
                                src={language.image || unknown} 
                                alt={capitalizeWords(language.title)} 
                                className="w-full h-60 object-cover rounded-t-lg"
                                onContextMenu={(e) => e.preventDefault()} 
                                draggable="false" 
                            />
                        </div>
                        <div className="p-4">
                            <h4 className="text-lg font-semibold h-10 overflow-hidden text-center">{capitalizeWords(language.title)}</h4>
                            <p className="text-l flex items-center">
                                <FaRegClock className="mr-1" />
                                <span className="mx-1 font-semibold">Duration:</span>
                                {capitalizeWords(language.duration)}
                            </p>              
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Languages;