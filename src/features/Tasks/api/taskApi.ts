import baseURL from "src/service/api/api";
import { ITask } from "../redux/taskType";

export const taskApi = {
  getTasksAPI: () => {
    return baseURL.get(`/api/services/app/Task/GetAll`);
  },
  postTaskAPI: (task: ITask) => {
    const url = `/api/services/app/Task/Save`;
    return baseURL.post(url, task);
  },
  deleteTaskAPI: (id: number) => {
    const url = `/api/services/app/Task/Delete?Id=${id}`;
    return baseURL.delete(url);
  },
  archiveTaskAPI: (id: number) => {
    const url = `/api/services/app/Task/Archive?Id=${id}`;
    return baseURL.delete(url);
  },
  deArchiveTaskAPI: (id: number) => {
    const url = `/api/services/app/Task/DeArchive`;
    return baseURL.post(url, { id });
  },
};
