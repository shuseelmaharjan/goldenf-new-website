import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient';
import { FaPlay, FaPause } from 'react-icons/fa';

const KAnswer = ({ setId, qn, examId, userId }) => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [playCount, setPlayCount] = useState({}); // Track play counts for each audio option

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const questionResponse = await apiClient.get(`api/fetch-question/${setId}/${qn}/`);
        setQuestionData(questionResponse.data);

        const answerResponse = await apiClient.get(`api/getAnswer/${examId}/${userId}/qn${qn}/`);
        const answerValue = answerResponse.data[`qn${qn}`];

        if (answerValue) {
          setSelectedOption(answerValue.toUpperCase());
        } else {
          setSelectedOption(null);
        }
      } catch (error) {
        console.error('Error fetching question data or answer:', error);
      }
    };

    fetchQuestionData();
  }, [setId, qn, examId, userId]);

  const updateAnswer = async (qn, label) => {
    const columnName = `qn${qn}`;
    try {
      await apiClient.post(`api/submit-answer/${examId}/${userId}/`, {
        [columnName]: label,
      });
    } catch (error) {
      console.error('Error updating answer:', error);
    }
  };

  const handleOptionClick = (label) => {
    setSelectedOption(label);
    updateAnswer(qn, label);
  };

  const toggleAudio = (audioSrc, label) => {
    const currentPlayCount = playCount[label] || 0;

    if (currentPlayCount < 3) {
      const audio = new Audio(audioSrc);
      audio.play();
      setPlayingAudio(audio);
      setPlayCount(prev => ({ ...prev, [label]: currentPlayCount + 1 }));

      // Pause audio when it ends
      audio.onended = () => {
        setPlayingAudio(null);
      };
    }
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
                    className={`flex-grow p-2 text-black rounded border border-gray-500 ${selectedOption === option.label ? 'bg-blue-800 text-white' : 'bg-transparent'}`}
                    onClick={() => handleOptionClick(option.label)}
                >
                  {questionData.answer_type === 'text' && <span>{option.text}</span>}
                  {questionData.answer_type === 'audio' && option.audio && (
                      <div className="flex flex-col">
                        <button
                            onClick={() => toggleAudio(`${apiClient.defaults.baseURL}${option.audio}`, option.label)}
                            className="flex items-center space-x-2"
                            disabled={playCount[option.label] >= 2} // Disable if played twice
                        >
                          {playingAudio && playingAudio.src === `${apiClient.defaults.baseURL}${option.audio}` ? (
                              <FaPause className="text-xl" />
                          ) : (
                              <FaPlay className="text-xl" />
                          )}
                          <span>Select this option</span>
                        </button>
                      </div>
                  )}
                </button>
              </div>
            </div>
        ))}
      </div>
  );
};

export default KAnswer;
