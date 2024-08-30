import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const IconsCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ],
  };

  return (
    <div className="container mx-auto py-6">
      <div className="text-center mb-6">
        <h5 className="text-gray-600">Get Ahead With Our Master</h5>
        <h3 className="text-xl font-semibold">Master Programs</h3>
        <div className="mx-auto mt-2 w-12 h-1 bg-orange-500"></div>
      </div>
      <Slider {...settings} className="overflow-hidden">
        {data.map((course, index) => (
          <div key={index} className="flex items-center justify-center p-3">
            <img
              className="w-24 h-24 object-cover"
              src={course.image}
              alt={course.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const data = [
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/2101px-Adobe_Photoshop_CC_icon.svg.png',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/2101px-Adobe_Illustrator_CC_icon.svg.png',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/1101px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png',
  },
  {
    image: 'https://1000logos.net/wp-content/uploads/2020/08/Microsoft-PowerPoint-Logo-2013-2018.jpg',
  },
  {
    image: 'https://www.bhphotovideo.com/images/images2000x2000/corel_esdcdgssub1yama_coreldraw_graphics_suite_365_day_1774925.jpg',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/2101px-Adobe_Premiere_Pro_CC_icon.svg.png',
  }
];

export default IconsCarousel;
