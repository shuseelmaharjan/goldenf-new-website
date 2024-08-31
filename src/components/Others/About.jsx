import React from 'react';

const About = () => {
  window.scrollTo(0, 0); 
  return (
    <>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold">About Golden Future Institute</h3>
            <div className="w-12 h-1 bg-orange-500 mx-auto mt-2"></div>
          </div>
          <div className="text-gray-700 space-y-6">
            <p>
              Golden Future Institute, nestled in the heart of Chandragiri-11, Satungal Kathmandu, stands as a beacon of educational excellence. Our institute is renowned for its comprehensive array of computer courses, catering to students eager to delve into the realm of technology and innovation. From programming languages to software applications, we offer top-notch training that equips learners with the tools they need to thrive in today's digital landscape.
            </p>
            <p>
              In addition to our esteemed computer courses, Golden Future Institute extends its educational offerings to encompass a wide range of tutoring services. Students from various academic levels, including school and +2, benefit from personalized guidance and support across subjects. Our dedicated team of educators ensures that each student receives the attention and resources necessary to excel academically and achieve their fullest potential.
            </p>
            <p>
              Furthermore, Golden Future Institute goes beyond traditional education by providing language classes designed to broaden horizons and foster cultural understanding. Whether it's mastering English for global communication, delving into the intricacies of Korean language and culture, or exploring the nuances of Japanese, our language programs offer enriching experiences that prepare students for a diverse and interconnected world. Join us at Golden Future Institute, where knowledge meets opportunity and dreams take flight.
            </p>
          </div>
        </div>
    </>
  );
};

export default About;
