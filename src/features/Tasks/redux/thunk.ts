import { createAsyncThunk } from "@reduxjs/toolkit";
import { taskApi } from "../api/taskApi";
import { ITask } from "./taskType";
import { toast } from "react-toastify";
export const getAllTask = createAsyncThunk("task/getAllTask", async () => {
  const res = await taskApi.getTasksAPI();
  return res.data.result;
});
export const postTask = createAsyncThunk(
  "task/postNewTask",
  async (task: ITask, ThunkAPI) => {
    try {
      const res = await taskApi.postTaskAPI(task);
      return res.data.result;
    } catch (error) {
      toast.error(error?.response.data.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id?: number) => {
    if (id) await taskApi.deleteTaskAPI(id);
    return id;
  }
);
export const archiveTask = createAsyncThunk(
  "task/archiveTask",
  async (id: number | undefined, ThunkAPI) => {
    try {
      if (id) await taskApi.archiveTaskAPI(id);
      return id;
    } catch (error) {
      toast.error(error.response.data.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deArchiveTask = createAsyncThunk(
  "task/deArchiveTask",
  async (id?: number) => {
    if (id) await taskApi.deArchiveTaskAPI(id);
    return id;
  }
);
