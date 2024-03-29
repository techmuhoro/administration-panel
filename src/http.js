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
  timeoutErrorMessage: "Waiting response taking too long...Aborted!",
});

/** Error builder class */
class Err extends AxiosError {
  httpMessage = "";
  /**
   * Create an Error
   * @param {*} error
   */
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

    this.#buildErrorMessage(error);
  }

  #buildErrorMessage(error) {
    if (error?.code === "EAI_AGAIN") {
      this.httpMessage =
        "Connectivity problems. Try checking your internet connection";
    } else if (error?.code === "ERR_NETWORK") {
      this.httpMessage = "Unable to reach remote address due to network issues";
    }

    if (error.response) {
      const statusCode = error?.response?.status;
      const ServerErrorMsg = error?.response?.data?.error?.message; // Set error message to what is reported from the server
      if (statusCode === 401) {
        this.httpMessage = "Unauthenticated! Log in required\u{26A0}\u{FE0F}";
      } else {
        this.httpMessage = typeof ServerErrorMsg == "string" ? ServerErrorMsg : "";
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
        const gc = cookies().get("global-country")?.value || "KE";

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        config.params = { ...(config.params && config.params), gc }; // global country
      } else {
        // const Cookies = await import("js-cookie");
        const Cookies = require("js-cookie"); // Using require since dynamic import(above) fails to import module
        const token = Cookies.get(JWTAuthTokenName);
        const gc = Cookies.get("global-country") || "KE";

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        config.params = { ...(config.params && config.params), gc }; // global country
      }

      delete config.includeAuthorization;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  function (error) {
    return Promise.reject(new Err(error));
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

    if (statusCode === 401) {
      // TODO: Handle Unauthenticated error
    }

    return Promise.reject(customError);
  }
);

export default http;
