import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CEO from '../../images/ceo.jpg';

const CeoMessage = () => {
  return (
    <div className="bg-[#E5F1FE] bg-gradient-to-b from-[#E5F1FE] to-[#CAECFF] bg-cover relative">
      <div className="container mx-auto py-6 mt-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-1/2 flex justify-center lg:justify-end mb-6 lg:mb-0">
            <img 
              src={CEO} 
              className="w-3/4 lg:w-4/5 xl:w-2/3 max-w-xs h-auto rounded-lg shadow-lg" 
              alt="ceo" 
            />
          </div>
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-4">
            <h3 className="text-2xl font-bold text-black mb-2">Sanat Basnet</h3>
            <div className="w-12 h-1 bg-orange-500 mb-2"></div>
            <h6 className="text-lg font-semibold text-black mb-4">CEO | Golden Future Institute</h6>
            <p className="text-base text-black">
              “With a passion for technology and a dedication to teaching, Golden Future Institute has helped countless students achieve their goals in the field of computer training.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoMessage;
