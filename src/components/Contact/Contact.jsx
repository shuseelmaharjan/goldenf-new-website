import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient';
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Loader from '../Loader/Loader';

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);
    const isValidPhone = /^\d{10}$/.test(formData.phone);
    if (!isValidEmail) {
      setErrors({ ...errors, email: 'Invalid email' });
    } else if (!isValidPhone) {
      setErrors({ ...errors, phone: 'Invalid phone number' });
    } else {
      try {
        setErrors({ email: '', phone: '' });
        await apiClient.post('/api/create-contact/', formData);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setFormData({
          full_name: '',
          email: '',
          subject: '',
          message: '',
          phone: ''
        });
      } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('An error occurred while submitting the contact form. Please try again later.');
      }
    }
  };

  window.scrollTo(0, 0);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">Contact</h3>
        <div className="mx-auto mt-2 w-12 h-1 bg-[#f29200]"></div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 mb-6 md:mb-0 p-4">
          <h4 className="ml-8 text-lg font-semibold">Get in Touch with Us</h4>
          <div className="mt-4 ml-8">
            <div className="flex items-center mt-2">
              <span className="mr-2">
                <IoIosMail />
              </span>
              <a href="mailto:goldenfutureinstitute1@gmail.com" className="text-black hover:underline ml-2">goldenfutureinstitute1@gmail.com</a>
            </div>
            <div className="flex items-center mt-2">
              <span className="mr-2">
                <FaPhone />
              </span>
              <a href="tel:+977-01-5108166" className="text-black hover:underline ml-2">01-5108166</a>,
              <a href="tel:+977-9813940696" className="text-black hover:underline ml-2">9813940696</a>
            </div>
            <div className="flex items-center mt-2">
              <span className="mr-2">
                <FaLocationDot />
              </span>
              <span className="ml-2">Satungal, Chandragiri-11, Kathmandu</span>
            </div>
          </div>
          <div className="mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.7059742276452!2d85.25232080720956!3d27.68670241882602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb229346686321%3A0xfd893f2b4a26070e!2sGolden%20Future%20Institute!5e0!3m2!1sen!2snp!4v1713265806686!5m2!1sen!2snp"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Golden Future Institute"
            ></iframe>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium mb-2">Full Name:</label>
              <input type="text" className="w-full p-2 border rounded-lg bg-gray-100" name="full_name" value={formData.full_name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email:</label>
              <input type="email" className="w-full p-2 border rounded-lg bg-gray-100" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number:</label>
              <input type="tel" className="w-full p-2 border rounded-lg bg-gray-100" name="phone" value={formData.phone} onChange={handleChange} />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject:</label>
              <input type="text" className="w-full p-2 border rounded-lg bg-gray-100" name="subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message:</label>
              <textarea name="message" id="message" className="w-full p-2 border rounded-lg bg-gray-100" rows="4" value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Send</button>
            </div>
          </form>
          {success && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
              Message submitted successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
