import { ITask } from "src/features/Tasks/redux/taskType";
import { EBranchUser, ELevelUser, ETypeUser } from "./user.types";

export interface IProject {
  customerName: string;
  name: string;
  code: string;
  status: EStatusProjectForm;
  pms: string[];
  activeMember: number;
  projectType: EProjectType;
  timeStart: string;
  timeEnd: string;
  id: number;
}

export interface IProjectReducer {
  listProject: IProject[];
  filterStatus: EStatusProject;
  timeSheetStatisticTasks: [];
  timeSheetStatisticTeams: [];
  selectedTaskList: ITask[];
  unSelectedTaskList: ITask[];
  listUser: IUser[];
  selectedUserList: IUser[];
  filterListUserUnSelected: {
    branch: EBranchUser;
    type: ETypeUser;
    level: ELevelUser;
    search: string;
  };
  projectEdit: IProjectForm | null;
}

export interface IProjectState {
  projects: IProjectReducer;
}

export enum EProjectType {
  TM,
  FF,
  NB,
  ODC,
}

export enum EStatusProject {
  All = "All",
  Active = "Active",
  InActive = "InActive",
}

export enum EStatusProjectForm {
  Active,
  DeActive,
}

export interface IProjectForm {
  name: string;
  code: string;
  status?: EStatusProjectForm;
  timeStart?: string | null;
  timeEnd?: string | null;
  note: string | null;
  projectType: EProjectType;
  customerId: number;
  tasks: {
    taskId?: number;
    billable?: boolean;
    id?: number;
  }[];
  users: {
    userId?: number;
    type?: number | null;
    id?: number;
  }[];
  projectTargetUsers: {}[];
  isAllUserBelongTo: boolean;
  id?: number;
}

export enum EUserList {
  SelectedUserList = "SelectedUserList",
  UnSelectedUserList = "UnSelectedUserList",
}

export enum ETaskList {
  SelectedTaskList = "SelectedTaskList",
  UnSelectedTaskList = "UnSelectedTaskList",
}

export interface IUser {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  phoneNumber: string | null;
  address: string | null;
  isActive: boolean;
  fullName: string;
  roleNames: [string];
  type: ETypeUser | null;
  salary: number | null;
  salaryAt: string | null;
  startDateAt: string | null;
  allowedLeaveDay: number | null;
  userCode: string | null;
  jobTitle: string | null;
  level: number | null;
  registerWorkDay: string | null;
  managerId: number | null;
  branch: EBranchUser;
  sex: number | null;
  avatarPath: string | null;
  morningWorking: number;
  morningStartAt: string | null;
  morningEndAt: string | null;
  afternoonWorking: number;
  afternoonStartAt: string | null;
  afternoonEndAt: string | null;
  isWorkingTimeDefault: boolean;
  isStopWork: boolean;
  id: number;
  memberType?: EMemberType;
  userId?: number;
}

export enum EMemberType {
  Member,
  ProjectManager,
  Shadow,
  DeActive,
}

export enum EFilterTime {
  Week = "Week",
  Month = "Month",
  Quarter = "Quarter",
  Year = "Year",
  All = "All Time",
  Custom = "Custom Time",
}

export interface IGetTimeSheetProject {
  id?: string;
  start: string;
  end: string;
}

export interface ITimeSheetStatisticTask {
  taskId?: number;
  taskName: string;
  totalWorkingTime: number;
  billableWorkingTime: number;
  billable?: boolean;
}

export interface ITimeSheetStatisticTeam {
  userID?: number;
  userName: string;
  projectUserType?: number;
  totalWorkingTime: number;
  billableWorkingTime: number;
}

export enum ETabType {
  Tasks,
  Teams,
}
