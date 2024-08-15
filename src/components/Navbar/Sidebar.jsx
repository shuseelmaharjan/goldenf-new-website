import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 bg-gray-800 text-white transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:relative md:w-1/5`} // 20% width for desktop
      style={{ width: isOpen ? '75%' : '20%' }} // 75% width when open for mobile
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <button onClick={onClose} className="md:hidden">
          <FaTimes className="text-2xl" />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        <Link to="/" className="text-white hover:bg-gray-700 p-2 rounded">Home</Link>
        <Link to="/courses" className="text-white hover:bg-gray-700 p-2 rounded">Courses</Link>
        <Link to="/contact" className="text-white hover:bg-gray-700 p-2 rounded">Contact</Link>
        {/* Add more links as needed */}
      </nav>
      {isOpen && <div className="fixed inset-0 z-30 bg-transparent" onClick={onClose}></div>}
    </div>
  );
};

export default Sidebar;
