import React, { useEffect, useState } from 'react';
import Sidebar from '../Navbar/Sidebar';
import { FaBook, FaClipboardList, FaDollarSign, FaUserAlt } from 'react-icons/fa';
import Username from '../Others/Username';
import apiClient from '../../apiClient';
import { FaBarsStaggered } from "react-icons/fa6";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [examAttended, setExamAttend] = useState(0);
  const [coursesSelected, setSelectedCourse] = useState(0);
  const [activeExams, setActiveExams] = useState(0);
  const [dueFees, setDueFee] = useState(0);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await apiClient.get('user-auth/user-detail/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setUserId(response.data.id); 
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserId();

    const fetchDashboardData = async () => {
        try {
          const response1 = await apiClient.get(`/api/count-modal-rows/${userId}/`);
          setExamAttend(response1.data.modal_count);

          const response2 = await apiClient.get(`/api/count-user-courses/${userId}/`);
          setSelectedCourse(response2.data.user_count);

          const response3 = await apiClient.get(`/api/count-ongoing-exams/`);
          setActiveExams(response3.data.ongoing_count);

          const response4 = await apiClient.get(`/api/only-due/${userId}/`);
          setDueFee(response4.data.due_amount);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      };

      if (userId) {
        fetchDashboardData();
      }
    }, [userId]);

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
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center">
              <FaBook className="text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-bold">Exam Attended</h2>
                <p className="text-xl">{examAttended}</p>
              </div>
            </div>

            <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center">
              <FaUserAlt className="text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-bold">Courses Selected</h2>
                <p className="text-xl">{coursesSelected}</p>
              </div>
            </div>

            <div className="bg-orange-500 text-white p-4 rounded-lg shadow-lg flex items-center">
              <FaClipboardList className="text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-bold">Active Exams</h2>
                <p className="text-xl">{activeExams}</p>
              </div>
            </div>

            <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center">
              <FaDollarSign className="text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-bold">Due Fees</h2>
                <p className="text-xl">{dueFees}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
