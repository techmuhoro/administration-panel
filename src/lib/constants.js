export const DEFAULT_ROWS_PER_PAGE = 10;

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ERROR_MSG_LOOKUP = {
  401: "You are Unauthenticated",
  403: "You don not have permission to perform this action",
  404: "Backend could not resolve this resquest because the page was not found.",
  406: "There is an error in your form",
  500: "An internal server error occurred. Kindly contact Admin.",
};
