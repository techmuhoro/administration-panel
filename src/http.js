import axios, { AxiosError } from "axios";

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
  timeoutErrorMessage: "Server taking too long to respond...Aborted!",
});

class Err extends AxiosError {
  constructor(error) {
    super(
      error.message || "",
      error?.code,
      error?.config,
      error?.request,
      error?.response
    );
    this.name = "AxiosExtendedError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }

    if (error?.code === "EAI_AGAIN") {
      this.message =
        "Connectivity problems. Try checking your internet connection";
    } else if (error?.code === "ERR_NETWORK") {
      this.message = "Unable to reach remote address due network problems";
    }

    if (error.response) {
      const statusCode = error.response.status || undefined;
      const ServerErrorMsg = error?.response?.data?.error?.message; // Set error message to what is reported from the server
      if (statusCode === 401) {
        this.message = "Unauthenticated! Log in required⚠️";
      } else {
        this.message = ServerErrorMsg || "";
      }
    }
  }
}

http.interceptors.request.use(
  async (config) => {
    if (config?.includeAuthorization) {
      config.withCredentials = true;
      if (isServer) {
        const { cookies } = await import("next/headers"),
          token = cookies().get(JWTAuthTokenName)?.value;

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } else {
        // const Cookies = await import("js-cookie");
        const Cookies = require("js-cookie"); // Using require since dynamic import(above) fails to import module
        const token = Cookies.get(JWTAuthTokenName);

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      delete config.includeAuthorization;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
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
    const customError = new Err(error);

    const statusCode = customError.response?.status;

    if (statusCode === "401") {
      // TODO: Handle Unauthenticated error(redirection, ...)
    }

    return Promise.reject(customError);
  }
);

export default http;
