import React, { useEffect, useState } from 'react';
import Sidebar from '../Navbar/Sidebar';
import { FaBarsStaggered } from "react-icons/fa6";
import Username from '../Others/Username';
import apiClient from '../../apiClient';
import { formatDate } from "../../utils/TextUtils";

const ExamHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [history, setHistory] = useState([]);

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
        const response = await apiClient.get('user-auth/user-detail/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchExamHistory = async () => {
      if (!userId) return;
      try {
        const response = await apiClient.get(`api/get-attended-exams/${userId}/`);
        const examsWithResults = await Promise.all(response.data.modals.map(async (exam) => {
          const resultResponse = await apiClient.get(`api/validate_answer/${exam.exam}/${exam.set}/${userId}/`);
          return { ...exam, score: resultResponse.data.total_true_count/40*100 + " %" }; // Add the score to the exam object
        }));
        setHistory(examsWithResults);
      } catch (error) {
        console.log("Error fetching exam history: ", error);
      }
    };

    fetchExamHistory();
  }, [userId]);

  return (
      <div className="md:flex">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1">
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
                  <th className="px-6 py-3 text-left">Ended on</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Score</th>
                </tr>
                </thead>
                <tbody>
                {history.length === 0 ? (
                    <tr>
                      <td colSpan={5} className='text-center px-6 py-4 text-sm text-gray-800'>No exams history.</td>
                    </tr>
                ) : (
                    history.map((exam, index) => (
                        <tr key={exam.id} className="border-b hover:bg-gray-100">
                          <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                          <td className="px-6 py-4 text-sm text-gray-800">{formatDate(exam.started_date)}</td>
                          <td className="px-6 py-4 text-sm text-gray-800">{formatDate(exam.ended_date)}</td>
                          <td className="px-6 py-4 text-sm text-gray-800">{exam.is_active ? 'Completed' : 'Not Completed'}</td>
                          <td className="px-6 py-4 text-sm text-gray-800">{exam.score !== undefined ? exam.score : 'N/A'}</td>
                        </tr>
                    ))
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ExamHistory;
