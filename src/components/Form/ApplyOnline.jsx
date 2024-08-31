import React, { useState } from 'react';
import apiClient from '../../apiClient';

const ApplyOnline = () => {
  const [usernameStatus, setUsernameStatus] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    username: '',
    phone: '',
    address: '',
    guardian: '',
    desired_course: '',
    school_name: '',
    level: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    username: ''
  });

  const validateField = (name, value) => {
    let error = '';

    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email address.';
    }

    if (name === 'phone' && !/^\d{10}$/.test(value)) {
      error = 'Enter a valid phone number.';
    }

    if (
      name === 'username' &&
      (/\s/.test(value) || /[A-Z]/.test(value) || value.length < 4 || value.length > 16)
    ) {
      error = 'Username must be 4-16 characters long, contain no spaces or uppercase letters.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === '';
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((name) => {
      if (!validateField(name, formData[name])) {
        isValid = false;
      }
    });
    return isValid;
  };

  const checkUsernameAvailability = async (username) => {
    if (!username || errors.username) {
      setUsernameStatus('invalid');
      return;
    }

    setUsernameStatus('checking');

    try {
      const response = await apiClient.get(`/api/check-username-exists/${username}/`);

      if (response.data.exists) {
        setUsernameStatus('unavailable');
        suggestUsernames(username);
      } else {
        setUsernameStatus('available');
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
      setUsernameStatus('unavailable');
    }
  };

  const suggestUsernames = (username) => {
    const suggestions = Array.from({ length: 3 }, (_, i) => `${username}${i + 1}`);
    setSuggestions(suggestions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    validateField(name, value);

    if (name === 'username') {
      checkUsernameAvailability(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const postData = {
      ...formData,
      remarks: `Desired Course: ${formData.desired_course}\nName of School/College: ${formData.school_name}\nLevel: ${formData.level}`
    };

    try {
      setLoading(true);
      await apiClient.post('/api/custom-users/', postData);
      setSuccessMessage('Form submitted successfully');
      setErrorMessage('');
      setFormData({
        full_name: '',
        email: '',
        username: '',
        phone: '',
        address: '',
        guardian: '',
        desired_course: '',
        school_name: '',
        level: ''
      });
      setUsernameStatus('');
      setSuggestions([]);
    } catch (error) {
      setErrorMessage('Error submitting form');
      setSuccessMessage('');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="text-center py-4 bg-blue-600">
        <h4 className="text-white">Online Application</h4>
      </div>
      <div className="bg-gray-100 shadow-lg p-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "full_name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Username", name: "username", type: "text" },
              { label: "Phone Number", name: "phone", type: "number" },
              { label: "Address", name: "address", type: "text" },
              { label: "Guardian", name: "guardian", type: "text" },
              { label: "Desired Course", name: "desired_course", type: "text" },
              { label: "Name of School/College", name: "school_name", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name} className="form-group">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors[name] ? 'border-red-500' : ''}`}
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                {name === 'username' && (
                  <>
                    {usernameStatus && (
                      <div className={`flex mt-2 text-sm ${usernameStatus === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                        {usernameStatus === 'available' && 'Username available'}
                        {usernameStatus === 'unavailable' && 'Username unavailable'}
                        {usernameStatus === 'invalid' && 'Username must contain only lowercase letters, numbers, or underscores'}
                        {suggestions.length > 0 && (
                          <div className="flex mx-4">
                            <p className="flex text-sm text-gray-600">Suggestions:</p>
                            <ul className="flex text-sm text-gray-600">
                              {suggestions.map((suggestion, index) => (
                                <li className="mx-1 bg-orange-500 px-2 rounded text-white" key={index}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="SEE">SEE</option>
              <option value="+2">+2</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          </div>
        </form>
        {successMessage && (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyOnline;
