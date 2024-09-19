import React, { useEffect, useState, useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import apiClient from '../../apiClient';
import unknown from '../../images/unknown.gif';
import { capitalizeWords } from '../../utils/TextUtils';
import { FaRegClock } from "react-icons/fa6";
import { CoursesLoader } from '../Loader/CoursesLoader';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const OfferCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/computercourses/');
        const modifiedData = response.data.map(course => ({
          ...course,
          image: course.image ? `${apiClient.defaults.baseURL}${course.image}` : null
        }));
        setCourses(modifiedData);
        setIsLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching data', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  return (
    <div className="container mx-auto mt-6 py-6">
      <div className="text-center mb-6">
        <h5 className="text-gray-600">Certificate</h5>
        <h3 className="text-xl font-semibold">Courses We Offer</h3>
        <div className="mx-auto mt-2 w-12 h-1 bg-orange-500"></div>
      </div>
      <div className="relative">
        {isLoading ? (
          <CoursesLoader />
        ) : (
          <div className="relative">
            <Slider {...settings} ref={sliderRef} className="pb-6">
              {courses.map((course, index) => (
                <div key={index} className="p-2">
                    <Link to={`/courses/${course.slug}`} 
                    className={`block bg-white border rounded-lg shadow-md overflow-hidden transition-shadow duration-300 ${hoveredIndex === index ? 'shadow-lg' : 'shadow-sm'}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    <div className="relative h-48 overflow-hidden">
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
            </Slider>
            <div className="flex items-center justify-end w-full top-full left-0 p-2">
                <div className="flex">
                <button
                onClick={() => sliderRef.current.slickPrev()}
                className="bg-orange-600 text-white p-2 shadow-lg "
                style={{ marginRight: '10px' }}
              >
                <FaArrowLeft/>
              </button>
              <button
                onClick={() => sliderRef.current.slickNext()}
                className="bg-orange-600 text-white p-2 shadow-lg"
                style={{ marginLeft: 'auto' }}
              >
                <FaArrowRight/>
              </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfferCourses;
