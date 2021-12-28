import { createAsyncThunk } from "@reduxjs/toolkit";
import { customerApi } from "../../api/customerApi";
import { ICustomer } from "./customerType";
export const getAllCustomersThunk = createAsyncThunk(
  "customers/getAllCustomer",
  async () => {
    const response = await customerApi.getAllCustomerAPI();
    return response.data.result;
  }
);

export const postCustomerThunk = createAsyncThunk(
  "customers/save",
  async (customer: ICustomer) => {
    const response = await customerApi.postNewCustomerAPI(customer);
    return response.data.result;
  }
);
