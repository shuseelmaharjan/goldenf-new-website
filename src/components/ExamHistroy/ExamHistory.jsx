import React, { useEffect, useState } from 'react';
import Sidebar from '../Navbar/Sidebar';
import { FaBarsStaggered } from "react-icons/fa6";
import Username from '../Others/Username';
import apiClient from '../../apiClient';

const ExamHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  useEffect(()=>{
    const fetchUserData = async () => { 
      try {
        const accessToken = localStorage.getItem('accessToken');
  
        if (!accessToken) {
          console.error('No access token found');
          return;
        }
  
        const response = await apiClient.get('user-auth/user-detail/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserId(response.data.id);
        console.log(response.data.id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();

    
  });
  return (
    <div className="md:flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        {/* Topbar */}
        <div className="flex justify-between md:justify-end items-center p-4 shadow-md bg-white">
          <button className="md:hidden p-2 text-black" onClick={toggleSidebar}>
            <FaBarsStaggered />
          </button>
          <Username />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Exam History</h1>
          <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-100">
          <thead className="border-b-2 border-gray-600">
                <tr className="bg-white text-gray-800 text-sm font-bold">
                  <th className="px-6 py-3 text-left">S.N.</th>
                  <th className="px-6 py-3 text-left">Exam Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Score</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                
   
                </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamHistory;
