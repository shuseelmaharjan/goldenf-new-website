import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import blacklogo from '../../images/blacklogo.webp';
import whitelogo from '../../images/whitelogo.webp';
import { FaHome, FaHistory, FaUser, FaLock, FaClipboardList } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import LogoutConfirmationModal from '../Login/LogoutConfirmationModal';
import apiClient from '../../apiClient';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      await apiClient.post('/user-auth/logout/', {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {/* Overlay for mobile view */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col shadow-lg overflow-y-auto z-50 w-64 h-screen transition-transform md:relative md:translate-x-0 
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
        <nav className="p-4 flex-grow">
          <Link
            to="/dashboard"
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/dashboard' ? 'bg-[#f29200] text-white' : 'text-black md:text-white'} hover:bg-orange-600 hover:text-white`}
          >
            <FaHome />
            <span className="mx-2">Dashboard</span>
          </Link>
          <Link
            to="/exam"
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/exam' ? 'bg-[#f29200] text-white' : 'text-black md:text-white'} hover:bg-orange-600 hover:text-white`}
          >
            <FaClipboardList />
            <span className="mx-2">Exams</span>
          </Link>
          <Link
            to="/exam-history"
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/exam-history' ? 'bg-[#f29200] text-white' : 'text-black md:text-white'} hover:bg-orange-600 hover:text-white`}
          >
            <FaHistory />
            <span className="mx-2">Exam History</span>
          </Link>
          <Link
            to="/profile"
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/profile' ? 'bg-[#f29200] text-white' : 'text-black md:text-white'} hover:bg-orange-600 hover:text-white`}
          >
            <FaUser />
            <span className="mx-2">Profile</span>
          </Link>
          <Link
            to="/change-password"
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/change-password' ? 'bg-[#f29200] text-white' : 'text-black md:text-white'} hover:bg-orange-600 hover:text-white`}
          >
            <FaLock />
            <span className="mx-2">Change Password</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="p-4 mb-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center w-full py-2.5 px-4 text-red-600 font-semibold hover:text-red-800 border-t border-black-800 md:border-400 mb-0"
          >
            <RiLogoutCircleRLine />
            <span className='mx-2'>Logout</span>
          </button>
        </div>
      </div>

      <LogoutConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleLogoutConfirm();
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default Sidebar;
