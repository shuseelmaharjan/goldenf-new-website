import React, { useState } from 'react';
import Sidebar from '../Navbar/Sidebar';
import { FaBarsStaggered } from "react-icons/fa6";
import Username from '../Others/Username';

const ChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        {/* Topbar */}
        <div className="flex justify-between md:justify-end items-center p-4 shadow-md bg-white">
          <button className="md:hidden p-2 text-black" onClick={toggleSidebar}>
            <FaBarsStaggered />
          </button>
          <Username />
        </div>

        {/* Main Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">ChangePassword</h1>
          <div className="container">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
