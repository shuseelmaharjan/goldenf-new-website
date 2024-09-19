import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient';
import useUserConfig from "../../config/UserConfig";

const KAnswer = ({ setId, qn, examId, userId }) => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const { userID } = useUserConfig();

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await apiClient.get(`api/fetch-question/${setId}/${qn}/`);
        console.log("setId: " + setId + ", Question No.: " + qn);
        setQuestionData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    fetchQuestionData();
  }, [setId, qn]);

  const updateAnswer = async (label) => {
    const columnName = `qn${qn}`; // Determine the column name based on the question number
    try {
      const response = await apiClient.patch(`api/modal/${examId}/${userID}/`, {
        [columnName]: label, // Dynamically set the column name
      });
      console.log('Answer updated:', response.data);
    } catch (error) {
      console.error('Error updating answer:', error);
    }
  };

  const handleOptionClick = (label) => {
    setSelectedOption(label);
    updateAnswer(label); // Call the update function here
  };

  if (!questionData) return <p>Loading...</p>;

  const options = [
    { label: 'A', text: questionData.option1_text, image: questionData.option1_image, audio: questionData.option1_audio },
    { label: 'B', text: questionData.option2_text, image: questionData.option2_image, audio: questionData.option2_audio },
    { label: 'C', text: questionData.option3_text, image: questionData.option3_image, audio: questionData.option3_audio },
    { label: 'D', text: questionData.option4_text, image: questionData.option4_image, audio: questionData.option4_audio }
  ];

  const isImageAnswerType = questionData.answer_type === 'image';

  return (
      <div className={`flex ${isImageAnswerType ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'flex-wrap gap-4'}`}>
        {options.map((option, index) => (
            <div key={index} className="w-full p-2">
              <div className="flex items-center gap-4">
                <p className="font-bold">{option.label}</p>
                <button
                    className={`flex-grow p-2 text-black rounded border border-gray-500 ${
                        selectedOption === option.label ? 'bg-blue-800 text-white' : 'bg-transparent'
                    }`}
                    onClick={() => handleOptionClick(option.label)}
                >
                  {questionData.answer_type === 'text' && <span>{option.text}</span>}
                  {questionData.answer_type === 'image' && option.image && (
                      <img
                          src={`${apiClient.defaults.baseURL}${option.image}`}
                          alt={`Option ${option.label}`}
                          className="w-full h-auto object-contain"
                      />
                  )}
                  {questionData.answer_type === 'audio' && option.audio && (
                      <audio controls className="w-full">
                        <source src={`${apiClient.defaults.baseURL}${option.audio}`} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                  )}
                </button>
              </div>
            </div>
        ))}
      </div>
  );
};

export default KAnswer;
