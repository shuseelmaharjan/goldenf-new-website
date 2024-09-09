import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import defaultImage from '../../images/bgg.jpg'; 
import { capitalizeWords } from '../Utils/TextUtils';
import './Style.css';
import { FaFacebookF } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";

const BlogDetails = () => {
    const { slug } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adData, setAdData] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                const response = await apiClient.get(`/api/get-events/${slug}/`);
                setEvent(response.data);
                
                const adResponse = await apiClient.get('/api/get-random-ads2/');
                if (adResponse.data) {
                    setAdData(adResponse.data);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        window.scrollTo(0, 0);
        fetchEvent();
    }, [slug]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event) {
        return <div>No data found for this event.</div>;
    }

    return (
        <div className="relative">
            {/* Image Section */}
            <div className="relative w-full">
                <img 
                    src={event.image ? `${event.image}` : defaultImage} 
                    alt={event.title} 
                    className="w-full h-32 object-cover"
                    onContextMenu={(e) => e.preventDefault()} 
                    draggable="false"
                />
                {/* Overlay with Breadcrumbs */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start">
                    <div className="container mx-auto px-4 breadcrumb text-white flex justify-left align-center space-x-2">
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/events" className="hover:text-gray-300">Events</Link>
                        <span className="mx-2">/</span>
                        <span>{capitalizeWords(event.name)}</span>
                    </div>
                </div>
            </div>

            {/* Event Info Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row lg:space-x-4">
                    <div className="w-full lg:w-4/5">
                        <img src={event.image ? `${event.image}` : defaultImage} alt={event.title} className="w-full mb-4" />
                        <div className="text-left mb-6">
                            <h1 className="text-2xl font-bold mb-2">{capitalizeWords(event.name)}</h1>
                        </div>
                        <div className="custom-list" dangerouslySetInnerHTML={{ __html: event.description }} />
                        {/* Share and Copy Link Section */}
                        <div className="mt-6">
                            <div className="block mb-3 mt-3">
                                <h3 className='text-xl text-bold'>Share on :</h3>
                            </div>
                            <div className="flex">
                                <button 
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} 
                                    className="bg-blue-600 text-white p-3 rounded-full mr-2 flex items-center justify-center"
                                >
                                    <FaFacebookF />
                                </button>
                                <button 
                                    onClick={handleCopyLink} 
                                    className="bg-gray-600 text-white p-3 rounded-full flex items-center justify-center"
                                >
                                    <GrAttachment />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Ad Section */}
                    <div className="w-full lg:w-1/5 lg:sticky lg:top-0 mb-4 lg:mb-0 py-3 lg:order-2">
                        <div className="hidden lg:block">
                            {adData.map((item) => (
                                <div key={item.id} className="mb-4">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        <img 
                                            src={`${apiClient.defaults.baseURL}${item.image}`} 
                                            alt={item.title} 
                                            className="w-full rounded-lg shadow-lg" 
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Display ads at the end in mobile view */}
                <div className="lg:hidden mt-4">
                    {adData.map((item) => (
                        <div key={item.id} className="mb-4">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <img 
                                    src={`${apiClient.defaults.baseURL}${item.image}`} 
                                    alt={item.title} 
                                    className="w-full rounded-lg shadow-lg" 
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogDetails;
