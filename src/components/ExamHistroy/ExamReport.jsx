import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient';

const ExamReport = ({ userId, setId, examId }) => {
  const [examData, setExamData] = useState({ questions: [], user_answers: {} });

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await apiClient.get(`/api/report/set/${setId}/user/${userId}/exam/${examId}/`);
        setExamData(response.data);
      } catch (error) {
        console.error('Error fetching exam data:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };

    fetchExamData();
  }, [setId, userId, examId]);

  const getClassNameForOption = (question, option) => {
    const userAnswer = examData.user_answers[`qn${question.qn}`];
    const correctAnswer = question.answer;

    if (!userAnswer) {
      return correctAnswer === option ? 'text-green-500' : '';
    }

    if (userAnswer === option) {
      return userAnswer === correctAnswer ? 'text-green-500' : 'text-red-500';
    }

    return correctAnswer === option ? 'text-green-500' : '';
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4">
        {examData.questions.map((question) => (
          <div key={question.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="font-bold mb-2">QN: {question.qn}</div>
                {question.label && (
                  <div dangerouslySetInnerHTML={{ __html: question.label }} />
                )}
                {question.question_type === 'text' && (
                  <div>{question.question_text}</div>
                )}
                {question.question_type === 'image' && question.question_image && (
                  <img
                    src={apiClient.defaults.baseURL + question.question_image}
                    alt={`Question ${question.qn}`}
                    className="w-full h-auto rounded-lg mt-2"
                  />
                )}
              </div>
              <div>
                {question.answer_type === 'text' && (
                  <div>
                    <div className={`py-1 ${getClassNameForOption(question, 'a')}`}>Option 1: {question.option1_text}</div>
                    <div className={`py-1 ${getClassNameForOption(question, 'b')}`}>Option 2: {question.option2_text}</div>
                    <div className={`py-1 ${getClassNameForOption(question, 'c')}`}>Option 3: {question.option3_text}</div>
                    <div className={`py-1 ${getClassNameForOption(question, 'd')}`}>Option 4: {question.option4_text}</div>
                  </div>
                )}
                {question.answer_type === 'image' && (
                  <div className="flex flex-wrap gap-2">
                    {question.option1_image && (
                      <img
                        src={apiClient.defaults.baseURL + question.option1_image}
                        alt="Option 1"
                        className={`w-1/2 rounded-lg ${getClassNameForOption(question, 'a')}`}
                      />
                    )}
                    {question.option2_image && (
                      <img
                        src={apiClient.defaults.baseURL + question.option2_image}
                        alt="Option 2"
                        className={`w-1/2 rounded-lg ${getClassNameForOption(question, 'b')}`}
                      />
                    )}
                    {question.option3_image && (
                      <img
                        src={apiClient.defaults.baseURL + question.option3_image}
                        alt="Option 3"
                        className={`w-1/2 rounded-lg ${getClassNameForOption(question, 'c')}`}
                      />
                    )}
                    {question.option4_image && (
                      <img
                        src={apiClient.defaults.baseURL + question.option4_image}
                        alt="Option 4"
                        className={`w-1/2 rounded-lg ${getClassNameForOption(question, 'd')}`}
                      />
                    )}
                  </div>
                )}
                {question.answer_type === 'audio' && (
                  <div>
                    {question.option1_audio && (
                      <div className={`py-2 ${getClassNameForOption(question, 'a')}`}>
                        <audio controls>
                          <source src={apiClient.defaults.baseURL + question.option1_audio} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                    {question.option2_audio && (
                      <div className={`py-2 ${getClassNameForOption(question, 'b')}`}>
                        <audio controls>
                          <source src={apiClient.defaults.baseURL + question.option2_audio} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                    {question.option3_audio && (
                      <div className={`py-2 ${getClassNameForOption(question, 'c')}`}>
                        <audio controls>
                          <source src={apiClient.defaults.baseURL + question.option3_audio} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                    {question.option4_audio && (
                      <div className={`py-2 ${getClassNameForOption(question, 'd')}`}>
                        <audio controls>
                          <source src={apiClient.defaults.baseURL + question.option4_audio} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <strong>You Answered:</strong> {examData.user_answers[`qn${question.qn}`] ? examData.user_answers[`qn${question.qn}`].toUpperCase() : <span className="text-gray-500">Not Answered</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamReport;
