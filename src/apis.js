// import axios from "axios";

// let BASE_URL = "https://jsonplaceholder.typicode.com";

// const Service = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Accept: "application/json",
//   },
// });

// export const handleFetchData = async (endpoint, withHeaders) => {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: "Bearer YourAccessToken", // Access token from cookie
//   };

//   const options = withHeaders ? { headers } : {};

//   const response = await axios.get(BASE_URL + endpoint, options);
//   return response;
// };

// export const handlePostData = async (endpoint, payload, withHeaders) => {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: "Bearer YourAccessToken", // Access token from cookie
//   };

//   const options = withHeaders ? { headers } : {};

//   const response = await axios.post(BASE_URL + endpoint, payload, options);
//   return response;
// };

let BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import axios from "axios";
import { cookies } from "next/headers";

const cookiesList = cookies();
const hasCookie = cookiesList.has("token");

const cookieStore = cookies();
const token = cookieStore.get("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (hasCookie) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    //console.log("failled");
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //console.log("failied");
    return Promise.reject(error);
  }
);

export default axiosInstance;
