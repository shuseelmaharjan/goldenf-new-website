import React from 'react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  const currentDate = new Date().getFullYear(); 

  return (
    <footer className="bg-gray-100 border-t-2 border-gray-300 py-3">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h5 className="text-lg font-semibold">About Golden Future Institute</h5>
            <p className="text-gray-700">
              Golden Future Institute, nestled in the heart of Chandragiri-11, Satungal Kathmandu, stands as a beacon of educational excellence. Our institute... 
              <br />
              <Link to={'/about-us'} className="text-gray-700 underline">Read More</Link>
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="text-lg font-semibold">Links</h5>
            <hr className="border-t border-gray-300" />
            <ul className="space-y-2">
              <li><Link to={`/`} className="text-gray-700 hover:underline">Home</Link></li>
              <li><Link to={`/courses`} className="text-gray-700 hover:underline">Courses</Link></li>
              <li><Link to={`/downloads`} className="text-gray-700 hover:underline">Downloads</Link></li>
              <li><Link to={`/events`} className="text-gray-700 hover:underline">Blogs</Link></li>
              <li><Link to={`/contact`} className="text-gray-700 hover:underline">Contact</Link></li>
              <li><Link to={`/online-application`} className="text-gray-700 hover:underline">Online Application</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="text-lg font-semibold">Contact Us</h5>
            <hr className="border-t border-gray-300" />
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fa fa-phone"></i>
                <span className="ml-3 text-gray-700">
                  <a href="tel:+977-01-5108166" className="hover:underline">01-5108166</a>, 
                  <a href="tel:+977-9813940696" className="ml-2 hover:underline">9813940696</a>
                </span>
              </li>
              <li className="flex items-center">
                <i className="fa fa-envelope"></i>
                <span className="ml-3 text-gray-700">
                  <a href="mailto:goldenfutureinstitute1@gmail.com" className="hover:underline">goldenfutureinstitute1@gmail.com</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 border-t-2 border-gray-300 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-700">&copy; Copyright Golden Future Institute 2023 - {currentDate}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
