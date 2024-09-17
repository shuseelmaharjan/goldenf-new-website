import React, { useState, useEffect } from 'react';
import Sidebar from '../Navbar/Sidebar';
import { FaBarsStaggered } from "react-icons/fa6";
import Username from '../Others/Username';
import apiClient from '../../apiClient';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const navigate = useNavigate();

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
        setUserId(userResponse.data.id);

      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
  
    fetchUserData();
  }, []);

  useEffect(() => {
    let interval = null;

    if (isTimerActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsTimerActive(false);
      navigate('/login'); // Redirect after the timer ends
    }

    return () => clearInterval(interval);
  }, [isTimerActive, seconds, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId === null) {
      console.error('Unable to retrieve user ID.');
      return;
    }
    try {
      setIsChangingPassword(true);
    
      const accessToken = localStorage.getItem('accessToken');
    
      if (!accessToken) {
        console.error('No access token found');
        return;
      }
    
      const response = await apiClient.put(
        `/api/update-password/${userId}/`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    
      if(response.data.success){
        setMessage(response.data.success);
        setIsTimerActive(true); // Start the timer
      } else {
        setError(response.data.non_field_errors);
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      console.error(
        error.response?.data?.message || 'An error occurred while updating the password.'
      );
      setError(error.response?.data?.message || 'An error occurred while updating the password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen">
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
        <div className="container my-6">
          <h1 className="text-2xl font-bold mb-4">Change Password</h1>
          <div className="w-full mx-auto bg-white rounded-md">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="form-input w-full border rounded p-2"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowCurrentPassword}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showCurrentPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="form-input w-full border rounded p-2"
                    name="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowNewPassword}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showNewPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-input w-full border rounded p-2"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-500 text-white rounded ${isChangingPassword ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? 'Changing Password...' : 'Change Password'}
                </button>
              </div>
            </form>
            {message && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded mt-3 flex space-between">{message}, now please relogin after {seconds} seconds.</div>}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded mt-3">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
