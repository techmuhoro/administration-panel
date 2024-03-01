import axios from "axios";

let BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// let BASE_URL = "https://jsonplaceholder.typicode.com";

export const handleFetchData = async (endpoint, withHeaders) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer YourAccessToken", // Access token from cookie
  };

  const options = withHeaders ? { headers } : {};

  const response = await axios.get(BASE_URL + endpoint, options);
  return response;
};

export const handlePostData = async (endpoint, payload, withHeaders) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer YourAccessToken", // Access token from cookie
  };

  const options = withHeaders ? { headers } : {};

  const response = await axios.post(BASE_URL + endpoint, payload, options);
  return response;
};
