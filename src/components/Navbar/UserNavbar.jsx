import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const UserNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo is removed as per the requirement */}
        
        <div className="flex items-center space-x-4">
          <span className="hidden md:block">Username</span>
          <button onClick={toggleSidebar} className="md:hidden">
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-gray-800 bg-opacity-75 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:bg-transparent md:w-64`}
        style={{ width: '75%' }}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold text-white">Sidebar</h2>
          <button onClick={toggleSidebar} className="md:hidden">
            <FaTimes className="text-2xl text-white" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2 md:space-y-4">
          <Link to="/" className="text-white hover:bg-gray-700 p-2 rounded">Home</Link>
          <Link to="/courses" className="text-white hover:bg-gray-700 p-2 rounded">Courses</Link>
          <Link to="/contact" className="text-white hover:bg-gray-700 p-2 rounded">Contact</Link>
          {/* Add more links as needed */}
        </nav>
      </div>
    </header>
  );
};

export default UserNavbar;
