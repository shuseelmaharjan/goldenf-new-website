import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import flag from '../../images/flag.gif';
import logo from '../../images/blacklogo.webp';
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
    <div className="sticky top-0 transition-all duration-300 ease-in-out z-50">

        {/* Topbar */}
        <div className="bg-[#0962c6] h-10">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8 h-full text-white text-sm">
            {/* Left Side */}
            <div className="flex space-x-4 text-[1rem]">
            <span className="hidden md:flex items-center space-x-2">
                <FaPhoneAlt />
                <span>01-5108166, 9813940696</span>
            </span>
            <span className="hidden md:flex items-center space-x-2">
                <IoMail />
                <span>goldenfutureinstitute1@gmail.com</span>
            </span>
            </div>
            {/* Right Side */}
            <div className="flex space-x-2">
            <Link to="#" className="bg-[#f29200] text-white px-3 py-1 rounded text-[1rem]">
                <span className='flex items-center'>Apply Online <FaArrowRight style={{marginLeft:'5px'}}/></span>
            </Link>
            <Link to="#" className="bg-[#f29200] flex items-center space-x-2 text-white px-3 py-1 rounded text-[1rem] hidden md:inline">
                <span className='flex items-center'>Login <FaArrowRight style={{marginLeft:'5px'}}/></span>
            </Link>
            </div>
        </div>
        </div>
      {/* Navbar */}
      <nav className="bg-white shadow-md h-20 z-50">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8 h-full">
          {/* Logo */}
          <div className="text-black font-bold flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="logo" className="h-20 w-auto p-3" />
            </Link>
          </div>

          {/* NavList */}
          <div className="hidden md:flex space-x-6 text-[1rem] font-semibold">
            <Link
              to="/"
              className={`hover:text-[#f29200] hover:border-b-4 hover:border-[#f29200] transition-all duration-300 ease-in-out ${location.pathname === '/' ? 'text-[#000] border-b-4 border-[#f29200]' : 'text-black'}`}
            >
              Home
            </Link>
            <Link
              to="/courses"
                className={`hover:text-[#f29200] hover:border-b-4 hover:border-[#f29200] transition-all duration-300 ease-in-out ${isActive('/courses') ? 'text-[#000] border-b-4 border-[#f29200]' : 'text-black'}`}
            >
              Courses
            </Link>
            <Link
              to="/languages"
              className={`hover:text-[#f29200] hover:border-b-4 hover:border-[#f29200] transition-all duration-300 ease-in-out ${isActive('/languages') ? 'text-[#000] border-b-4 border-[#f29200]' : 'text-black'}`}
            >
              Languages
            </Link>
            <Link
              to="/tuition"
              className={`hover:text-[#f29200] hover:border-b-4 hover:border-[#f29200] transition-all duration-300 ease-in-out ${isActive('/tuition') ? 'text-[#000] border-b-4 border-[#f29200]' : 'text-black'}`}
            >
              Tuition
            </Link>
            <Link
              to="/bridge-course"
              className={`hover:text-[#f29200] hover:border-b-4 hover:border-[#f29200] transition-all duration-300 ease-in-out ${isActive('/bridge-course') ? 'text-[#000] border-b-4 border-[#f29200]' : 'text-black'}`}
            >
              Bridge Course
            </Link>
            <Link
              to="/events"
              className={`hover:text-[#f29200] hover:border-b-4 hover:border-[#f29200] transition-all duration-300 ease-in-out ${isActive('/events') ? 'text-[#000] border-b-4 border-[#f29200]' : 'text-black'}`}
            >
              Events
            </Link>
            <Link
              to="/syllabus"
              className={`hover:text-[#f29200] hover:border-b-4 hover:border-[#f29200] transition-all duration-300 ease-in-out ${isActive('/syllabus') ? 'text-[#000] border-b-4 border-[#f29200]' : 'text-black'}`}
            >
              Syllabus
            </Link>
            <Link
              to="/contact"
              className={`hover:text-[#f29200] hover:border-b-4 hover:border-[#f29200] transition-all duration-300 ease-in-out ${isActive('/contact') ? 'text-[#000] border-b-4 border-[#f29200]' : 'text-black'}`}
            >
              Contact
            </Link>
          </div>

          {/* Flag */}
          <div className="hidden md:flex">
            <img src={flag} alt="Flag" className="h-20 w-auto p-3" />
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <img src={flag} alt="Flag" className="h-10 w-auto mr-2" />
            <button onClick={toggleMenu} className="md:hidden text-black focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
            isOpen ? 'translate-x-0 w-3/4' : 'translate-x-full w-0'
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col p-6 space-y-4">
            <Link
              to="/"
              className="text-black hover:text-gray-600 text-[1rem] font-semibold"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-black hover:text-gray-600 text-[1rem] font-semibold"
            >
            Courses
            </Link>
            <Link
              to="/languages"
              className="text-black hover:text-gray-600 text-[1rem] font-semibold"
            >
              Languages
            </Link>
            <Link
              to="/contact"
              className="text-black hover:text-gray-600 text-[1rem] font-semibold"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="md:hidden fixed inset-0 w-1/4 h-full bg-black opacity-50"
            onClick={toggleMenu}
          />
        )}
      </nav>
      </div>

    </>
  );
};

export default Navbar;
