import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { projectApi } from "../api/projectApi";
import { userApi } from "../api/userApi";
import { IGetTimeSheetProject, IProjectForm } from "./project.types";

export const getAllProject = createAsyncThunk(
  "project/getAllProject",
  async () => {
    const res = await projectApi.getAllProjectAPI();
    return res.data.result;
  }
);
export const activeProject = createAsyncThunk(
  "project/active",
  async (id: number) => {
    await projectApi.postProjectActiveAPI(id);
    return { id };
  }
);
export const deactiveProject = createAsyncThunk(
  "project/deactive",
  async (id: number) => {
    const res = await projectApi.postProjectDeactiveAPI(id);
    return { id, data: res.data };
  }
);

export const addProjectThunk = createAsyncThunk(
  "project/addProject",
  async (project: IProjectForm) => {
    await projectApi.postNewProjectAPI(project);
    const res = await projectApi.getAllProjectAPI();
    return res.data.result;
  }
);
export const EditProjectThunk = createAsyncThunk(
  "project/editProject",
  async (project: IProjectForm) => {
    await projectApi.postNewProjectAPI(project);
    const res = await projectApi.getAllProjectAPI();
    return res.data.result;
  }
);
export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id: number, ThunkAPI) => {
    try {
      await projectApi.deleteProjectAPI(id);
      return id;
    } catch (error) {
      toast.error(error.response.data.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return ThunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getProjectEditing = createAsyncThunk(
  "projects/getProject",
  async (id: number) => {
    const response = await projectApi.getProjectAPI(id);
    return response.data.result;
  }
);
export const getTimeSheetStatisticTasksThunk = createAsyncThunk(
  "projects/getStatisticTasks",
  async (project: IGetTimeSheetProject) => {
    const response = await projectApi.getTimesheetStatisticTaskProjectAPI(
      project
    );
    return response.data.result;
  }
);

export const getTimeSheetStatisticTeamsThunk = createAsyncThunk(
  "projects/getTimeSheetStatisticTeams",
  async (project: IGetTimeSheetProject) => {
    const response = await projectApi.getTimesheetStatisticTeamProjectAPI(
      project
    );
    return response.data.result;
  }
);

export const getAllUser = createAsyncThunk("users/getAll", async () => {
  const res = await userApi.getAllUserAPI();
  return res.data.result;
});
