import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionExpiredPopup = ({ onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm();
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login'); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
        <p className="mb-4">Your session has expired. Please log in again.</p>
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredPopup;
