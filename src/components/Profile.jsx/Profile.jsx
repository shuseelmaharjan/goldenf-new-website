import React, { useState, useEffect } from 'react';
import Sidebar from '../Navbar/Sidebar';
import { FaBarsStaggered } from "react-icons/fa6";
import Username from '../Others/Username';
import defaultImage from '../../images/bgg.jpg';
import apiClient from '../../apiClient';
import { capitalizeWords } from '../Utils/TextUtils';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
  
        if (!accessToken) {
          console.error('No access token found');
          return;
        }
  
        // Fetch user data
        const userResponse = await apiClient.get('user-auth/user-detail/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(userResponse.data);
  
        const coursesResponse = await apiClient.get(`api/all-active-inactive/${userResponse.data.id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Error fetching user or courses data', error);
      }
    };
  
    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

        <div className="container my-6">
          <h1 className="text-2xl font-bold mb-6">Profile</h1>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
            <img
              src={user.image || defaultImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border border-gray-300"
            />
            <div className="space-y-1">
              <p className="text-xl font-bold mb-3">{user.full_name}</p>
              <p className="text-lg font-semibold">Username: <span className="font-normal">{user.username}</span></p>
              <p className="text-lg font-semibold">Email: <span className="font-normal">{user.email}</span></p>
              <p className="text-lg font-semibold">Phone: <span className="font-normal">{user.phone}</span></p>
              <p className="text-lg font-semibold">Guardian: <span className="font-normal">{user.guardian}</span></p>
              <p className="text-lg font-semibold">Address: <span className="font-normal">{user.address}</span></p>
              <p className="text-lg font-semibold">Joined Date: <span className="font-normal">{formatDate(user.created_at)}</span></p>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">Selected Courses</h2>
          {courses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-100">
                <thead className="border-b-2 border-gray-600">
                  <tr className="bg-white text-gray-800 text-sm font-bold">
                    <th className="px-6 py-3 text-left">S.N.</th>
                    <th className="px-6 py-3 text-left">Course Title</th>
                    <th className="px-6 py-3 text-left">Shift</th>
                    <th className="px-6 py-3 text-left">Duration</th>
                    <th className="px-6 py-3 text-left">Joined Date</th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className='text-center px-6 py-4 text-sm text-gray-800'>No courses found</td>
                    </tr>
                  ) : (
                    courses.map((course, index) => (
                      <tr key={course.id} className="border-b hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{capitalizeWords(course.course.title)}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{course.shift.shiftname}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{capitalizeWords(course.course.duration)}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{formatDate(course.date)}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                        {course.active_status ? (
                          <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-md bg-green-100 text-green-800">
                            Ongoing
                          </span>
                        ) : (
                          <span className='flex'>
                            Ended on {formatDate(course.course_ended)}
                          </span>
                        )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No courses found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
