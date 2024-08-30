import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient';
import ExamReport from './ExamReport';


const ExamData = ({ userId, setId, examId }) => {
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`api/validate_answer/${examId}/${setId}/${userId}/`);
        setExamData(response.data);
      } catch (error) {
        console.error('Error fetching exam data:', error);
      }
    };

    fetchData();
  }, [userId, setId, examId]);

  return (
    <>
      {examData ? (
        <div className='flex justify-between'>
          <p>Correct: {examData.total_true_count}</p>
          <p>Incorrect: {examData.total_false_count}</p>
          <p>Percentage: {examData.total_true_count / 40 * 100} %</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
        {/* <ExamReport/> */}
    </>
  );
};

export default ExamData;
