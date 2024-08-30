import React, { useEffect, useState } from 'react';
import apiClient from './../../apiClient';

const Username = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
  
        if (!accessToken) {
          console.error('No access token found');
          return;
        }
  
        // Add the Authorization header with the access token
        const response = await apiClient.get('user-auth/user-detail/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username', error);
      }
    };
  
    fetchUsername();
  }, []);
  

  return (
    <div className='flex justify-end'>
      Welcome, {username}
    </div>
  );
};

export default Username;
