  import axios from 'axios';
  import { useNavigate } from 'react-router';
  import useAuth from './useAuth';
  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
  })
  function useAxiosSecure() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    // Add a request interceptor
    axiosSecure.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        const token = localStorage.getItem("access_token");
        config.headers.authorization = `barer ${token}`;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    axiosSecure.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = error.response.status;
        if (status === 401 || status === 403 || status === 404) {
          await logout()
          navigate('/login')
        }
        return Promise.reject(error);
      }
    );
    return axiosSecure
  }

export default useAxiosSecure;
  














// Axios Instance Creation: It creates an instance of Axios with a base URL of “http://localhost:3000”. This base URL will be prepended to any relative URL in the requests made using this instance.

// Request Interceptor: Before a request is sent, it adds an Authorization header to the request headers with a token retrieved from local storage. If there’s an error while making the request, it rejects the promise with the error.

// Response Interceptor: After a response is received, it checks the status of the response. If the status code is 401 (Unauthorized), 403 (Forbidden), or 404 (Not Found), it logs out the user and redirects them to the login page. If there’s an error while receiving the response, it rejects the promise with the error.

// Finally, it returns the Axios instance. You can use this instance to make HTTP requests that need authentication.

// This hook provides a convenient way to make authenticated HTTP requests. By using this hook, you don’t have to manually attach the token to every request and handle authentication errors everywhere in your code. Instead, you can just use this hook and it will handle these things for you.