import axios from "axios";

const JWTAuthTokenName = "token";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL,
  isServer = typeof window === "undefined";

const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "X-powered-by": "axios",
  },
  timeout: 10000,
});

// http.interceptors.request.use(
//   async (config) => {
//     // `includeAuthorization` is a custom config. It is checked to let axios know when we need to include
//     // Authorization header with token value read from cookie
//     if (config?.includeAuthorization) {
//       config.withCredentials = true;
//       if (isServer) {
//         const { cookies } = await import("next/headers"),
//           token = cookies().get(`${JWTAuthTokenName}`)?.value;

//         if (token) {
//           config.headers["Authorization"] = `Bearer ${token}`;
//         }
//       } else {
//         const Cookies = await import("js-cookie"),
//           token = Cookies.get(`${JWTAuthTokenName}`);
//         // const token = document.cookie.replace(
//         //   /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
//         //   "$1"
//         // );

//         if (token) {
//           config.headers["Authorization"] = `Bearer ${token}`;
//         }
//       }
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// export default http;

http.interceptors.request.use(
  async (config) => {
    if (config?.includeAuthorization) {
      config.withCredentials = true;
      if (isServer) {
        const { cookies } = await import("next/headers"),
          token = cookies().get(`${JWTAuthTokenName}`)?.value;

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } else {
        const Cookies = await import("js-cookie"),
          token = Cookies.get(`${JWTAuthTokenName}`);

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add response interceptor
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let errorMessage = "";
    if (error.response.data.statusCode == 401) {
      errorMessage = error.response.data;
    }

    return Promise.reject(errorMessage);
  }
);

export default http;
