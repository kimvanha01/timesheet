import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllCustomersThunk, postCustomerThunk } from "./customerThunk";
import { ICustomerState } from "./customerType";

const initialState: ICustomerState = {
  customerList: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomersThunk.fulfilled, (state, action) => {
      state.customerList = action.payload;
    });
    builder.addCase(postCustomerThunk.fulfilled, (state, action) => {
      state.customerList.push(action.payload);
      toast.success("Add Customer Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
  },
});

export const customerReducer = customerSlice.reducer;
