import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/lib/constants";
import Cookie from "js-cookie";

const token = Cookie.get("token");

export const handleOtpLogin = createAsyncThunk(
  "auth/verify-otp",
  async (payload) => {
    try {
      const response = await fetch(`${BASE_URL}auth/verify-otp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // If response is not successful, parse the error message from response body
        const errorData = await response.json();
        console.log(errorData);
        const errorMessage = errorData.error.message || "Failed to log in"; // Default message if no specific error message found
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // If there's an error, throw it for Redux Toolkit to handle rejection
      throw error;
    }
  }
);

const initialState = {
  data: [],
  error: "",
  loading: false,
};

const otploginSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleOtpLogin.pending, (state) => {
        state.loading = true;
        state.error = ""; // Clear error when starting request
      })
      .addCase(handleOtpLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(handleOtpLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to log in"; // Set error to actual error message or default message
      });
  },
});

export default otploginSlice.reducer;

export const getLoginData = (state) => state.loginData.data;
export const getLoading = (state) => state.loginData.loading;
export const getError = (state) => state.loginData.error;
