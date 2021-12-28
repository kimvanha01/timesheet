import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "src/service/api/api";

export const getCurrentUserLogged = createAsyncThunk(
  "user/getCurrentUserLogged",
  async () => {
    const res = await baseURL.get(
      "/api/services/app/Session/GetCurrentLoginInformations"
    );
    return res.data.result;
  }
);

export interface IUserData {
  name: string;
  emailAddress: string;
}
const initialState: IUserData = {
  name: "",
  emailAddress: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserLogged.fulfilled, (state, action) => {
      state.name = action.payload.user.name;
      state.emailAddress = action.payload.user.emailAddress;
    });
  },
});

export const userReducer = userSlice.reducer;
