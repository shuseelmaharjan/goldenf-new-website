import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';

const KQuestion = ({ setId, qn }) => {
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await apiClient.get(`api/fetch-question/${setId}/${qn}/`);
        setQuestionData(response.data);
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    if (setId && qn) {
      fetchQuestion();
    }
  }, [setId, qn]);

  if (!questionData) return <div>Loading...</div>;

  return (
      <div>
        <p dangerouslySetInnerHTML={{ __html: questionData.label }} />
        {questionData.question_type === 'text' && (
            <div>
              <p>{questionData.question_text}</p>
            </div>
        )}

        {questionData.question_type === 'audio' && (
            <div>
              {questionData.question_audio && (
                  <audio controls>
                    <source src={`${apiClient.defaults.baseURL}${questionData.question_audio}`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
              )}
            </div>
        )}

        {questionData.question_type === 'image' && (
            <div>
              {questionData.question_image && (
                  <img
                      src={`${apiClient.defaults.baseURL}${questionData.question_image}`}
                      alt="Question"
                      style={{ maxWidth: '100px', height: 'auto' }}
                  />
              )}
            </div>
        )}
      </div>
  );
};

export default KQuestion;
