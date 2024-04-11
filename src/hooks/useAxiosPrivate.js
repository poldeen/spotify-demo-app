import axios from 'axios';
import { useEffect, useState } from 'react';
import useRefreshToken from './useRefreshToken';

// Custom hook for API calls with request cancellation and interceptors
const useAxiosPrivate = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const refresh = useRefreshToken();
  const token = JSON.parse(localStorage.getItem('token'));

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1/', // Replace with your actual base URL
    maxBodyLength: Infinity
  });

  axiosInstance.interceptors.request.use(
    config => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token.access_token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    return () => {
      // Cancel the request when the component unmounts
      source.cancel('Component unmounted: Request cancelled.');
    };
  }, []);

  const fetchData = async ({ url, method, data = {}, params }) => {
    setLoading(true);

    console.log(method + ' ' + url);

    if (method === 'PUT' || method === 'POST') {
      try {
        const result = await axiosInstance({
          url,
          method,
          cancelToken: axios.CancelToken.source().token
        });
        setResponse(result.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled', error.message);
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const result = await axiosInstance({
          url,
          method,
          data: method.toLowerCase() === 'get' ? undefined : data, // Only include data for non-GET requests
          params: method.toLowerCase() === 'get' ? data : params, // For GET requests, use data as query params
          cancelToken: axios.CancelToken.source().token
        });
        setResponse(result.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled', error.message);
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Expose the state and the fetchData function
  return { response, error, loading, fetchData };
};

export default useAxiosPrivate;
