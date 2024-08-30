import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import apiClient from '../../apiClient';
import unknown from '../../images/unknown.gif';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await apiClient.get('/api/testimonial-list/');
      const modifiedTestimonialData = response.data.map(testimonial => ({
        ...testimonial,
        image: testimonial.image ? `${apiClient.defaults.baseURL}${testimonial.image}` : null
      }));
      setTestimonials(modifiedTestimonialData); 
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const settings = {
    dots: false,  
    infinite: true,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000, 
    cssEase: "linear",
    centerMode: true, 
    centerPadding: '0px',
    arrows: false, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="bg-gradient-to-r from-blue-200 to-blue-400 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 text-white">
          <h5 className="text-xl font-semibold">Testimonials</h5>
          <h6 className="text-lg">What Our Students Say About Us</h6>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-2"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/3 flex justify-center mb-4 lg:mb-0">
                      <img 
                        src={testimonial.image || unknown} 
                        className="rounded-full shadow-md w-36 h-36 object-cover" 
                        alt="testimonial avatar" 
                      />
                    </div>
                    <div className="lg:w-2/3 text-center lg:text-left">
                      <p className="text-gray-700 italic text-lg px-4">
                        {testimonial.message}
                      </p>
                      <h4 className="text-xl font-semibold mt-4">- {testimonial.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
