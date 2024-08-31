import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import flag from '../../images/flag.gif';
import logo from '../../images/blacklogo.webp';
import { IoBookSharp, IoMail } from "react-icons/io5";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdLogin, MdCastForEducation, MdContactMail } from 'react-icons/md';
import { FaBook, FaLanguage } from 'react-icons/fa6';
import { ImBooks } from "react-icons/im";
import { RiMiniProgramFill } from 'react-icons/ri';

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
            <Link to="/login" className="bg-[#f29200] flex items-center space-x-2 text-white px-3 py-1 rounded text-[1rem] hidden md:inline">
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
          <div className="flex justify-between p-4">
            <h4>Navigation</h4>

            <button onClick={toggleMenu} className="text-black focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col p-6 space-y-4">
            <Link to="/" className={`flex items-center text-black px-2 py-3 hover:text-gray-600 text-[1rem] font-semibold ${location.pathname === '/' ? 'text-white bg-[#f29200]' : 'text-black'}`}><FaHome/><span className='ml-2'>Home</span></Link>
            <Link to="/courses" className={`flex items-center text-black px-2 py-3 hover:text-gray-600 text-[1rem] font-semibold ${isActive('/courses') ? 'text-white bg-[#f29200]' : 'text-black'}`}><FaBook/><span className='ml-2'>Courses</span></Link>
            <Link to="/languages" className={`flex items-center text-black px-2 py-3 hover:text-gray-600 text-[1rem] font-semibold ${isActive('/languages') ? 'text-white bg-[#f29200]' : 'text-black'}`}><FaLanguage/><span className='ml-2'>Languages</span></Link>
            <Link to="/tuition" className={`flex items-center text-black px-2 py-3 hover:text-gray-600 text-[1rem] font-semibold ${isActive('/tuition') ? 'text-white bg-[#f29200]' : 'text-black'}`}><MdCastForEducation /><span className='ml-2'>Tuition</span></Link>
            <Link to="/bridge-course" className={`flex items-center text-black px-2 py-3 hover:text-gray-600 text-[1rem] font-semibold ${isActive('/bridge-course') ? 'text-white bg-[#f29200]' : 'text-black'}`}><ImBooks/><span className='ml-2'>Bridge Course</span></Link>
            <Link to="/events" className={`flex items-center text-black px-2 py-3 hover:text-gray-600 text-[1rem] font-semibold ${isActive('/events') ? 'text-white bg-[#f29200]' : 'text-black'}`}><RiMiniProgramFill/><span className='ml-2'>Events</span></Link>
            <Link to="/syllabus" className={`flex items-center text-black px-2 py-3 hover:text-gray-600 text-[1rem] font-semibold ${isActive('/syllabus') ? 'text-white bg-[#f29200]' : 'text-black'}`}><IoBookSharp/><span className='ml-2'>Syllabus</span></Link>
            <Link to="/contact" className={`flex items-center text-black px-2 py-3 hover:text-gray-600 text-[1rem] font-semibold ${isActive('/contact') ? 'text-white bg-[#f29200]' : 'text-black'}`}><MdContactMail/><span className='ml-2'>Contact</span></Link>
            <div className="mx-auto mt-2 w-full h-1 bg-[#f29200]"></div>
            <Link to="/login" className={`flex items-center px-2 py-3 text-[1rem] font-semibold hover:text-gray-600 ${isActive('/login') ? 'text-white bg-[#f29200]' : 'text-black'}`}><MdLogin /><span className="ml-2">Login</span></Link>
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
