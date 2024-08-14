import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'https://data.goldenfutureinstitute.com.np/', // Replace with your API base URL
  // You can add other default settings here if needed
  timeout: 10000, // Optional: Set a timeout for requests
});

// Optionally, add request interceptors
apiClient.interceptors.request.use(
  (config) => {
    // Add token or other headers here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optionally, add response interceptors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;
