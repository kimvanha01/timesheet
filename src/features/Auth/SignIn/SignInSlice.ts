import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import baseURL from "src/service/api/api";
import { DataLogin } from "./type";

export const loginAuth = createAsyncThunk(
  "auth/loginAuth",
  async ({ userNameOrEmailAddress, password, rememberClient }: DataLogin) => {
    const response = await baseURL.post("/api/TokenAuth/Authenticate", {
      userNameOrEmailAddress,
      password,
      rememberClient,
    });
    localStorage.setItem(
      "token",
      JSON.stringify(response.data.result.accessToken)
    );
    return response.data;
  }
);
interface StateToken {
  token: null | string;
}

const initialState: StateToken = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.token = action.payload.result.accessToken;
        toast.success("Login successful", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(loginAuth.rejected, () => {
        toast.error("Login Fail", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  },
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
