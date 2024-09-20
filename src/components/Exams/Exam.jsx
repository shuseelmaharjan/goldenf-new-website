import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../Navbar/Sidebar';
import { FaBarsStaggered } from "react-icons/fa6";
import Username from '../Others/Username';
import apiClient from '../../apiClient';
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/TextUtils";

const Exam = () => {
  const [showModal, setShowResultModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [examSchedules, setExamSchedules] = useState([]);
  const [examExistence, setExamExistence] = useState({});
  const [userId, setUserId] = useState('');
  const [resultData, setResultData] = useState(null); // State for result data

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

        const response = await apiClient.get('user-auth/user-detail/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserId(response.data.id);
        console.log("ID: " + response.data.id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchExamSchedules = async () => {
      try {
        const response = await apiClient.get('api/ongoing-exam-schedules/');
        setExamSchedules(response.data);
      } catch (error) {
        console.error('Error fetching exam schedules:', error);
      }
    };

    fetchUserData().then(fetchExamSchedules);
  }, []);

  const checkExamTest = useCallback(async (examId, setId) => {
    try {
      const response = await apiClient.get(`api/check-modal-existence/${userId}/${examId}/${setId}/`);
      setExamExistence(prev => ({
        ...prev,
        [examId]: response.data.exists,
      }));
    } catch (error) {
      console.log("Error fetching api:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const checkExamExistence = async () => {
        for (const exam of examSchedules) {
          await checkExamTest(exam.id, exam.set.id);
        }
      };
      checkExamExistence();
    }
  }, [userId, examSchedules, checkExamTest]);

  const handleJoinExam = async (examSlug, examId, setId) => {
    if (!examSlug || !examId || !setId) return;

    try {
      const data = {
        exam: examId,
        set: setId,
        user: userId,
      };

      await apiClient.post('api/modal/exam-join/', data);
      navigate(`/exam/${examSlug}`);
    } catch (error) {
      console.error("Error joining exam:", error);
    }
  };

  const handleCheckResult = async (examId, setId) => {
    try {
      const response = await apiClient.get(`api/validate_answer/${examId}/${setId}/${userId}/`);
      setResultData(response.data); // Set the result data
      setShowResultModal(true); // Show the result modal
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const closeModal = () => {
    setShowResultModal(false);
  };

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

          <div className="container my-6">
            <h1 className="text-2xl font-bold mb-6">Exam</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-100">
                <thead className="border-b-2 border-gray-600">
                <tr className="bg-white text-gray-800 text-sm font-bold">
                  <th className="px-6 py-3 text-left">S.N.</th>
                  <th className="px-6 py-3 text-left">Scheduled At</th>
                  <th className="px-6 py-3 text-left">Course Code</th>
                  <th className="px-6 py-3 text-left">Exam Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {examSchedules.length === 0 ? (
                    <tr>
                      <td colSpan={5} className='text-center px-6 py-4 text-sm text-gray-800'>No exams scheduled currently.</td>
                    </tr>
                ) : (
                    examSchedules.map((exam, index) => (
                        <tr key={exam.id} className="border-b hover:bg-gray-100">
                          <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                          <td className="px-6 py-4 text-sm text-gray-800">{formatDate(exam.schedule_date)}</td>
                          <td className="px-6 py-4 text-sm text-gray-800">{exam.slug}</td>
                          <td className="px-6 py-4 text-sm">
                        <span
                            className={`inline-block px-3 py-1.5 text-xs font-medium rounded-md ${
                                exam.status === 'scheduled'
                                    ? 'bg-blue-100 text-blue-800'
                                    : exam.status === 'ongoing'
                                        ? 'bg-green-100 text-green-800'
                                        : exam.status === 'completed'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                          {exam.status}
                        </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800">
                            {examExistence[exam.id] ? (
                                <button
                                    className="bg-green-700 text-white px-3 py-1.5 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
                                    onClick={() => handleCheckResult(exam.id, exam.set.id)}
                                >
                                  Check Result
                                </button>
                            ) : (
                                <button
                                    className="bg-green-700 text-white px-3 py-1.5 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
                                    onClick={() => handleJoinExam(exam.slug, exam.id, exam.set.id)}
                                >
                                  Join Now
                                </button>
                            )}
                          </td>
                        </tr>
                    ))
                )}
                </tbody>
              </table>

              {showModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-300 ease-in-out">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
                      <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <svg
                            className="w-6 h-6 text-green-600 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Answers
                      </h2>

                      <div className="flex flex-col space-y-4 mt-4">
                        <div className="bg-green-100 p-4 rounded-md flex items-center">
                          <svg
                              className="w-6 h-6 text-green-500 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                          </svg>
                          <h3 className="text-xl">Total Correct Answers: <strong>{resultData.total_true_count}</strong></h3>
                        </div>

                        <div className="bg-red-100 p-4 rounded-md flex items-center">
                          <svg
                              className="w-6 h-6 text-red-500 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l-3 3" />
                          </svg>
                          <h3 className="text-xl">Total Incorrect Answers: <strong>{resultData.total_false_count}</strong></h3>
                        </div>

                        <div className="bg-blue-100 p-4 rounded-md flex items-center">
                          <svg
                              className="w-6 h-6 text-blue-500 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <h2 className="text-2xl"><strong>Score:</strong> <strong>{((resultData.total_true_count / 40) * 100).toFixed(2)}%</strong></h2>
                        </div>
                      </div>

                      {/* Modal Button Controls */}
                      <div className="flex justify-end mt-6">
                        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded transition duration-300 hover:bg-gray-400" onClick={closeModal}>
                          Close
                        </button>
                      </div>
                    </div>
                  </div>

              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Exam;
