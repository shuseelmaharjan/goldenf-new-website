import React, { useState, useEffect } from 'react'
import logo from '../../images/logo.webp';
import apiClient from '../../apiClient';
import KQuestion from './KQuestion';
import KAnswer from './KAnswer';

const KoreanLanguage = () => {
  const [showModal, setShowModal] = useState(false)
  const [currentButton, setCurrentButton] = useState(1)
  const [setId, setSetId] = useState('');
  const [examId, setExamId] = useState('');

  const openModal = (buttonNumber) => {
    setCurrentButton(buttonNumber)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleNext = () => {
    setCurrentButton((prev) => (prev < 40 ? prev + 1 : prev))
  }

  const handlePrevious = () => {
    setCurrentButton((prev) => (prev > 1 ? prev - 1 : prev))
  }

  useEffect(() => {
    const fetchSetId = async() => {
        try{
            const response = await apiClient.get('api/ongoing-exam-schedules/');
            setSetId(response.data[0].set.id);
            setExamId(response.data[0].id);

        }catch(error){
            console.error('Error fetching data', error);
        }
    }
    fetchSetId();
  })
  return (
    <div className="relative bg-cover bg-center min-h-screen" >
      {/* Header Section */}
      <div className="w-full bg-blue-400 flex items-center" style={{height:'10vh'}}>
        <div className="container mx-auto flex justify-between px-4">
          <div>
            <h1 className="text-white text-lg font-semibold">EPS Topic Trial Exam</h1>
          </div>
          <div>
            <h1 className="text-white text-lg font-semibold">Time:</h1>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        className="absolute inset-0 bg-center"
        style={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            opacity: 0.4, 
            zIndex: -1, 
        }}
        />
        <div className='border border-gray p-3'>
          <h1 className="text-xl font-semibold py-3 mb-4 bg-blue-800 text-center text-white">Reading</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 20 }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => openModal(i + 1)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Listening Section */}
        <div className='border border-gray p-3'>
        <h1 className="text-xl font-semibold py-3 mb-4 bg-blue-800 text-center text-white">Listening</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 20 }, (_, i) => (
              <button
                key={i + 21}
                onClick={() => openModal(i + 21)}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              >
                {i + 21}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-4xl w-full justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Question {currentButton}</h2>
            <div className="flex justify-between mt-6">
                <div className="w-1/2 pr-2">
                    <KQuestion setId={setId} qn={currentButton} />
                </div>
                <div className="w-1/2 pl-2">
                    <KAnswer setId={setId} qn={currentButton} examId={examId} />
                </div>
            </div>
            {/* Modal Button Controls */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
              >
                Previous
              </button>
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Total Questions
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KoreanLanguage
