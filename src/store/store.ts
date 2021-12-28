import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../features/Auth/SignIn/SignInSlice";
import taskReducer from "../features/Tasks/redux/taskSlice";
import projectReducer from "../features/Projects/redux/projectSlice";
import { customerReducer } from "../features/Projects/redux/customer/customerSlice";
import { userReducer } from "src/features/Auth/SignIn/userSlice";

const reducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  projects: projectReducer,
  customers: customerReducer,
  user: userReducer,
});

const store = configureStore({
  reducer,
});

export default store;
export type RootState = ReturnType<typeof reducer>;
