import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

const AxiosInstance = axios.create({
  baseURL: baseURL,
   headers: {
      'Content-Type': 'application/json',
    }
});

// Request Interceptors
AxiosInstance.interceptors.request.use(
  function (config) {
    console.log("Request without auth header ==> ", config);
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // after this we access protected route since have access token
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptors
AxiosInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  // Handle failed response
  async function(error) {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await AxiosInstance.post("/token/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem('accessToken', response.data.access) // again set access token 
        originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
        return AxiosInstance(originalRequest);
      } 
      catch (error) { // after 1 day refresh token will expire 
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject(error);
  }
)
export default AxiosInstance;
