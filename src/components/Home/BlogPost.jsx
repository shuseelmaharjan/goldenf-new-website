import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient';
import { Link } from 'react-router-dom';

const BlogPost = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/last-three-events/');
        setEvents(response.data);  
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const truncateDescription = (description, maxLength) => {
    const lines = description.split('<p>').filter(Boolean).slice(0, 2);
    const truncatedDescription = lines.join('<p>').substring(0, maxLength);
    return truncatedDescription;
  };

  return (
    <div className='container mx-auto my-6 px-4'>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">Events / Seminars</h3>
        <div className="w-full h-1 bg-orange-500 mx-auto mt-2"></div>
      </div> 
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={event.image} 
                className="w-full h-48 object-cover" 
                alt={event.name} 
              />
              <div className="p-4">
                <Link 
                  to={`/events/${event.slug}`} 
                  className="text-xl font-semibold text-gray-900 hover:text-blue-500"
                >
                  {event.name}
                </Link>
                <p 
                  className="text-gray-700 mt-2"
                  dangerouslySetInnerHTML={{ __html: truncateDescription(event.description, 100) }}
                />
                {event.description.length > 50 && (
                  <Link 
                    to={`/events/${event.slug}`} 
                    className="text-blue-500 hover:underline mt-2 inline-block"
                  >
                    Read More
                  </Link>
                )}
                <div className="text-right mt-2">
                  <small className="text-gray-500">Posted Date: {formatDate(event.posted_date)}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events to display.</p>
      )}
    </div>
  );
};

export default BlogPost;
