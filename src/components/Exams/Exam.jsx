import React, { useState, useEffect } from 'react';
import Sidebar from '../Navbar/Sidebar';
import { FaBarsStaggered } from "react-icons/fa6";
import Username from '../Others/Username';
import apiClient from '../../apiClient';
import { useNavigate } from "react-router-dom";
import useUserConfig from "../../config/UserConfig";
import {formatDate} from "../../utils/TextUtils";

const Exam = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [examSchedules, setExamSchedules] = useState([]);
  const [examSlug, setExamSlug] = useState('');
  const [examId, setExamId] = useState('');
  const [setId, setSetId] = useState('');

  const navigate = useNavigate();
  const { userID } = useUserConfig();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchExamSchedules = async () => {
      try {
        const response = await apiClient.get('api/ongoing-exam-schedules/');
        setExamSchedules(response.data);
        if (response.data.length > 0) {
          setExamSlug(response.data[0].slug);
          setSetId(response.data[0].set.id);
          setExamId(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching exam schedules:', error);
      }
    };

    fetchExamSchedules();

    return () => {};
  }, []);

  const handleJoinExam = async () => {
    if (!examSlug || !examId || !setId) return;

    try {
      const data = {
        exam: examId,
        set: setId,
        user: userID,
      };

      await apiClient.post('api/modal/exam-join/', data);
      navigate(`/exam/${examSlug}`);
    } catch (error) {
      console.error("Error joining exam:", error);
    }
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
          <h1 className="text-2xl font-bold mb-6">Exam</h1>
          <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-100">
          <thead className="border-b-2 border-gray-600">
                <tr className="bg-white text-gray-800 text-sm font-bold">
                  <th className="px-6 py-3 text-left">S.N.</th>
                  <th className="px-6 py-3 text-left">Scheduled At</th>
                  <th className="px-6 py-3 text-left">Exam Slug</th>
                  <th className="px-6 py-3 text-left">Exam Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {examSchedules.length === 0 ? (
                  <>
                  <tr>
                    <td colSpan={4} className='text-center px-6 py-4 text-sm text-gray-800'>No exams has scheduled currently.</td>
                  </tr>
                  </>

                ) : (
                  <>
                  {examSchedules.map((exam, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{formatDate(exam.schedule_date)}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{examSlug}</td>
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

                          <button
                            className="bg-green-700 text-white px-3 py-1.5 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
                            onClick={() => handleJoinExam(exam.slug)}
                          >
                            Join Now
                          </button>

                      </td>
                    </tr>
                  ))}
                  </>
                )}
                  
                </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
