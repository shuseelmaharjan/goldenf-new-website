import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import blacklogo from '../../images/blacklogo.webp';
import whitelogo from '../../images/whitelogo.webp';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile view */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 transform shadow-lg overflow-y-auto z-50 w-64 h-screen transition-transform md:relative md:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        bg-white md:bg-gray-900`}
      >
        {/* Logo for desktop view */}
        <div className="hidden md:flex justify-between items-center p-9">
          <img src={whitelogo} alt="logo" className="w-32" />
        </div>

        {/* Header with logo and close button for mobile view */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <div className="flex p-5">
            <img src={blacklogo} alt="logo"/>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-black focus:outline-none"
          >
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

        {/* Navigation links */}
        <nav className="p-4">
          <Link
            to="/dashboard"
            className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/dashboard' ? 'bg-[#f29200] text-white' : 'text-black md:text-white'} hover:bg-blue-600 hover:text-white`}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/profile' ? 'bg-[#f29200] text-white' : 'text-black md:text-white'} hover:bg-blue-600 hover:text-white`}
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/settings' ? 'bg-[#f29200] text-white' : 'text-black md:text-white'} hover:bg-blue-600 hover:text-white`}
          >
            Settings
          </Link>
          <Link
            to="/logout"
            className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/logout' ? 'bg-[#f29200] text-white' : 'text-black md:text-white'} hover:bg-blue-600 hover:text-white`}
          >
            Logout
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
