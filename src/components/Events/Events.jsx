import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../apiClient';
import Loader from '../Loader/Loader';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await apiClient.get('/api/events/');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (loading) {
    return (<Loader/>);
  }

  return (
    <>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold">Events</h3>
            <div className="mx-auto mt-2 w-12 h-1 bg-[#f29200]"></div>
          </div>
          <div className="flex flex-wrap">
            {events.length === 0 ? (
              <div className="w-full text-center h-[70vh]">
                <p>No post has been published yet.</p>
              </div>
            ) : (
              events.slice().reverse().map((event) => (
                <div key={event.id} className="w-full md:w-1/3 px-4 mb-8">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h5 className="text-lg font-semibold">{event.name}</h5>
                      <p
                        className="text-gray-700 mt-2"
                        dangerouslySetInnerHTML={{
                          __html:
                            event.description.substring(0, 100) +
                            (event.description.length > 150 ? '...' : ''),
                        }}
                      ></p>
                      <Link
                        to={`/events/${event.slug}`}
                        className="inline-block mt-4 text-blue-500 hover:underline"
                      >
                        Read More
                      </Link>
                    </div>
                    <div className="p-4 bg-gray-100 text-gray-600 text-sm">
                      Published Date: {formatDate(event.posted_date)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
    </>
  );
};

export default Events;
