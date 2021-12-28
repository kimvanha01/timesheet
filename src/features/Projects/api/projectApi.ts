import baseURL from "src/service/api/api";
import { IGetTimeSheetProject, IProjectForm } from "../redux/project.types";

export const projectApi = {
  getAllProjectAPI: () => {
    const url = `/api/services/app/Project/GetAll`;
    return baseURL.get(url);
  },
  getProjectAPI: (id: number) => {
    const url = `/api/services/app/Project/Get?input=${id}`;
    return baseURL.get(url);
  },
  postProjectActiveAPI: (id: number) => {
    const url = `/api/services/app/Project/Active?input=${id}`;
    return baseURL.post(url, { id });
  },
  postProjectDeactiveAPI: (id: number) => {
    const url = `/api/services/app/Project/Inactive?input=${id}`;
    return baseURL.post(url, { id });
  },
  postNewProjectAPI: (project: IProjectForm) => {
    const url = "/api/services/app/Project/Save";
    return baseURL.post(url, project);
  },
  deleteProjectAPI: (id: number) => {
    const url = `/api/services/app/Project/Delete?Id=${id}`;
    return baseURL.delete(url);
  },
  getTimesheetStatisticTaskProjectAPI: (project: IGetTimeSheetProject) => {
    const url = `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTasks?projectId=${project.id}&startDate=${project.start}&endDate=${project.end}`;
    return baseURL.get(url);
  },
  getTimesheetStatisticTeamProjectAPI: (project: IGetTimeSheetProject) => {
    const url = `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTeams?projectId=${project.id}&startDate=${project.start}&endDate=${project.end}`;
    return baseURL.get(url);
  },
};
