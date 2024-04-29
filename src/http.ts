import axios, { AxiosError } from "axios";
import type {
  AxiosRequestConfig as ReqCfg,
  InternalAxiosRequestConfig as InternalReqCfg,
  AxiosResponse
} from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /**
     * If `true`, authentication credentials is added to the request. Defaults to `false`.
     */
    includeAuthorization?: boolean;
  }
}

interface ErrStructure<T = unknown, D = any> {
  message?: string;
  code?: string;
  config?: InternalReqCfg<D>;
  request?: any;
  response?: AxiosResponse<T, D>;
}

const JWTAuthTokenName = "token";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const isServer = typeof window === "undefined";

const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "X-powered-by": "axios"
  },
  timeout: 10000,
  timeoutErrorMessage: "Waiting for response taking too long...Aborted!"
});

/** Error builder class */
export class Err extends AxiosError {
  constructor(error: ErrStructure) {
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

  #buildErrorMessage(error: ErrStructure) {
    if (error?.code === "EAI_AGAIN") {
      this.message =
        "Connectivity problems. Try checking your internet connection";
    } else if (error?.code === "ERR_NETWORK") {
      this.message = "Unable to reach remote address due network issues";
    }

    if (error.response) {
      const statusCode = error?.response?.status;
      const serverResponse = error?.response?.data;

      if (
        typeof serverResponse === "object" &&
        serverResponse !== null &&
        "error" in serverResponse
      ) {
        type ServerError = { message?: unknown };
        const serverError = serverResponse.error as ServerError;
        const ServerErrorMsg =
          typeof serverError.message === "string" ? serverError.message : ""; // Set error message to what is reported from the server

        if (statusCode === 401) {
          this.message = "Unauthenticated! Log in required\u{26A0}\u{FE0F}";
        } else {
          this.message =
            typeof ServerErrorMsg === "string" ? ServerErrorMsg : "";
        }
      }
    }
  }
}

http.interceptors.request.use(
  async (config) => {
    const configObj = { ...config };
    const configAmmends: ReqCfg = {};

    if (config?.includeAuthorization) {
      configAmmends.withCredentials = true;

      if (isServer) {
        const { cookies } = await import("next/headers");
        const token = cookies().get(JWTAuthTokenName)?.value;
        const gc = cookies().get("global-country")?.value || "KE";

        if (token) {
          configAmmends.headers = {
            ...configAmmends.headers,
            Authorization: `Bearer ${token}`
          };
        }

        // Add global country to params
        if (gc) configAmmends.params = { ...configAmmends.params, gc };
      } else {
        const Cookies = (await import("js-cookie")).default;
        const token = Cookies.get(JWTAuthTokenName);
        const gc = Cookies.get("global-country") || "KE";

        if (token) {
          configAmmends.headers = {
            ...configAmmends.headers,
            Authorization: `Bearer ${token}`
          };
        }

        // Add global country to params
        if (gc) configAmmends.params = { ...configAmmends.params, gc };
      }

      delete configObj.includeAuthorization;
    }
    if (config.data instanceof FormData) {
      configAmmends.headers = {
        ...configAmmends.headers,
        "Content-Type": "multipart/form-data"
      };
    }

    return { ...configObj, ...configAmmends } as InternalReqCfg;
  },
  (error) => Promise.reject(new Err(error))
);

// Add response interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = new Err(error);

    const statusCode = customError.response?.status;

    if (statusCode === 401) {
      // TODO: Handle Unauthenticated error
    }

    return Promise.reject(customError);
  }
);

export default http;
