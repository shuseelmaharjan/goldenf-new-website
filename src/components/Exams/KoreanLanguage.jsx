import React, { useState, useEffect, useCallback } from 'react';
import logo from '../../images/logo.webp';
import apiClient from '../../apiClient';
import KQuestion from './KQuestion';
import KAnswer from './KAnswer';
import useUserConfig from "../../config/UserConfig";
import { useNavigate, useParams } from "react-router-dom";

const KoreanLanguage = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentButton, setCurrentButton] = useState(1);
    const [setId, setSetId] = useState('');
    const [examId, setExamId] = useState('');
    const [totalQuestions] = useState(40); // Assuming total questions are constant
    const [submittedCount, setSubmittedCount] = useState(0);
    const [pendingQns, setRemainingQuestions] = useState('');
    const [submittedAnswers, setSubmittedAnswers] = useState({});
    const [playCount, setPlayCount] = useState({}); // Track play counts for each audio option

    const { userID } = useUserConfig();
    const { slug } = useParams();
    const openModal = (buttonNumber) => {
        setCurrentButton(buttonNumber);
        setShowModal(true);
    };

    const closeModal = async () => {
        setShowModal(false);
        await remainingQuestions();
        await fetchAnswers();
    };

    const handleNext = async () => {
        setCurrentButton((prev) => (prev < totalQuestions ? prev + 1 : prev));
        await remainingQuestions();
    };

    const handlePrevious = async () => {
        setCurrentButton((prev) => (prev > 1 ? prev - 1 : prev));
        await remainingQuestions();
    };


    const fetchSetId = useCallback(async () => {
        try {
            const response = await apiClient.get(`api/get-set/${slug}/`);
            setSetId(response.data.set);
            setExamId(response.data.id);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }, [slug]);

    useEffect(() => {
        fetchSetId();
    }, [fetchSetId]);


    const remainingQuestions = useCallback(async () => {
        try {
            const response = await apiClient.get(`api/fetch-null-count/${userID}/${examId}/`);
            setRemainingQuestions(response.data.null_counts);
            setSubmittedCount(totalQuestions - response.data.null_counts);
        } catch (error) {
            console.error('Error fetching remaining answers', error);
        }
    }, [userID, examId, totalQuestions]);

    const fetchAnswers = useCallback(async () => {
        try {
            const response = await apiClient.get(`api/get-submitted-answers/UserId${userID}/ExamId${examId}/`);
            setSubmittedAnswers(response.data);
        } catch (error) {
            console.error('Error fetching submitted answers', error);
        }
    }, [userID, examId]);

    const toggleAudio = (audioSrc, label) => {
        const currentPlayCount = playCount[label] || 0;

        if (currentPlayCount < 2) { // Play twice limit
            const audio = new Audio(audioSrc);
            audio.play();
            setPlayCount(prev => ({ ...prev, [label]: currentPlayCount + 1 }));

            // Pause audio when it ends
            audio.onended = () => {
            };
        }
    };

    const navigate = useNavigate();
    const submitButton = async () => {
        try {
            await apiClient.put(`api/end-exam/${examId}/${userID}/`);
            navigate(`/exam`);
        } catch (error) {
            console.error("Error ending exam:", error);
        }
    };



    useEffect(() => {
        if (examId && userID) {
            remainingQuestions();
            fetchAnswers();
        }
    }, [examId, userID, remainingQuestions, fetchAnswers]);

    return (
        <div className="relative bg-cover bg-center min-h-screen">
            {/* Header Section */}
            <div className="w-full bg-blue-400 flex items-center" style={{ height: '10vh' }}>
                <div className="container mx-auto flex justify-between px-4">
                    <div className="flex items-center justify-center py-3">
                        <img src={logo} className="w-10" alt="Logo" />
                        <h1 className="text-white text-lg font-semibold ml-3">EPS Topic Trial Exam</h1>
                    </div>
                    <div>
                        <h1 className="text-white text-lg font-semibold">Time:</h1>
                    </div>
                </div>
            </div>

            <div className="relative container mx-auto px-4 mt-10 flex items-center justify-between bg-blue-900 text-white py-4">
                <span>Total Questions: {totalQuestions}</span>
                <span>Remaining: {pendingQns}</span>
                <span>Submitted: {submittedCount}</span>
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
                {/* Reading Section */}
                <div className='border border-gray p-3'>
                    <h1 className="text-xl font-semibold py-3 mb-4 bg-blue-800 text-center text-white">Reading</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Array.from({ length: 20 }, (_, i) => {
                            const questionNumber = i + 1;
                            const isSubmitted = submittedAnswers[`qn${questionNumber}`] !== null; // Check if the answer is submitted
                            const buttonClass = isSubmitted ? "bg-orange-500" : "bg-blue-500";

                            return (
                                <button
                                    key={questionNumber}
                                    onClick={() => openModal(questionNumber)}
                                    className={`${buttonClass} text-white py-2 px-4 rounded hover:bg-blue-600 transition`}
                                >
                                    {questionNumber}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Listening Section */}
                <div className='border border-gray p-3'>
                    <h1 className="text-xl font-semibold py-3 mb-4 bg-blue-800 text-center text-white">Listening</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Array.from({ length: 20 }, (_, i) => {
                            const questionNumber = i + 21;
                            const isSubmitted = submittedAnswers[`qn${questionNumber}`] !== null; // Check if the answer is submitted
                            const buttonClass = isSubmitted ? "bg-orange-500" : "bg-green-500";

                            return (
                                <button
                                    key={questionNumber}
                                    onClick={() => openModal(questionNumber)}
                                    className={`${buttonClass} text-white py-2 px-4 rounded hover:bg-green-600 transition`}
                                >
                                    {questionNumber}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="relative container mx-auto flex items-center justify-end mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800" onClick={submitButton}>Submit</button>
            </div>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-4xl w-full">
                        <h2 className="text-2xl font-bold mb-4">Question {currentButton}</h2>
                        <div className="flex justify-between mt-6">
                            <div className="w-1/2 pr-2">
                                <KQuestion setId={setId} qn={currentButton} />
                            </div>
                            <div className="w-1/2 pl-2">
                                <KAnswer
                                    setId={setId}
                                    qn={currentButton}
                                    examId={examId}
                                    userId={userID}
                                    playCount={playCount} // Pass playCount
                                    toggleAudio={toggleAudio} // Pass toggleAudio function
                                />
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
    );
};

export default KoreanLanguage;
