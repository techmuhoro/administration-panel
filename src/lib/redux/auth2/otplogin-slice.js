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
        const errorData = await response.json();
        let errorObject = errorData.error;

        const errorMessage =
          Object.values(errorObject)[0] || "Failed to log in";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
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
        state.error = "";
      })
      .addCase(handleOtpLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(handleOtpLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to log in";
      });
  },
});

export default otploginSlice.reducer;

export const getLoginData = (state) => state.loginData.data;
export const getLoading = (state) => state.loginData.loading;
export const getError = (state) => state.loginData.error;
