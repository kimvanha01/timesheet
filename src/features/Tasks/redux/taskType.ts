export interface ITask {
  name: string;
  type: number;
  isDeleted?: boolean;
  id?: number | undefined;
  taskId?: number;
  isBillable?: boolean;
}
export interface IListTask {
  listTask: ITask[];
}
export interface ITaskState {
  taskReducer: IListTask;
}

export enum ETaskType {
  CommonTask = "Common Task",
  OtherTask = "Other Task",
}

export enum ETaskTypeForm {
  CommonTask,
  OtherTask,
}

export interface ISelectedTask {
  taskId?: number;
  billable?: boolean;
  id?: number;
}
export interface ITaskForm {
  name: string;
  type: ETaskTypeForm;
  isDeleted?: boolean;
  id?: number;
}
