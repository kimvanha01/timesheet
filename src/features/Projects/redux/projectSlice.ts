import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ISelectedTask } from "src/features/Tasks/redux/taskType";
import { getAllTask } from "src/features/Tasks/redux/thunk";
import {
  EMemberType,
  EStatusProject,
  IProject,
  IProjectReducer,
} from "./project.types";
import {
  activeProject,
  addProjectThunk,
  deactiveProject,
  deleteProject,
  EditProjectThunk,
  getAllProject,
  getAllUser,
  getProjectEditing,
  getTimeSheetStatisticTasksThunk,
  getTimeSheetStatisticTeamsThunk,
} from "./projectThunk";
import {
  EBranchUser,
  ELevelUser,
  ETypeUser,
  ISelectedUser,
} from "./user.types";

const initialState: IProjectReducer = {
  listProject: [],
  filterStatus: EStatusProject.Active,
  timeSheetStatisticTasks: [],
  timeSheetStatisticTeams: [],
  selectedTaskList: [],
  unSelectedTaskList: [],
  listUser: [],
  selectedUserList: [],
  filterListUserUnSelected: {
    branch: EBranchUser.All,
    type: ETypeUser.All,
    level: ELevelUser.All,
    search: "",
  },
  projectEdit: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    changeStatusFilter: (state, action) => {
      state.filterStatus = action.payload;
    },
    selectTask: (state, action) => {
      state.selectedTaskList.push(action.payload);
      state.unSelectedTaskList = state.unSelectedTaskList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    deSelectTask: (state, action) => {
      state.unSelectedTaskList = [action.payload, ...state.unSelectedTaskList];
      state.selectedTaskList = state.selectedTaskList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    changeBillable: (state, action) => {
      const task = state.selectedTaskList.find(
        (task) => task.id === action.payload
      );
      if (task) {
        task.isBillable = !task.isBillable;
      }
    },
    selectUser: (state, action) => {
      if (!state.selectedUserList.length) {
        state.selectedUserList.push({
          ...action.payload,
          memberType: EMemberType.ProjectManager,
        });
      } else
        state.selectedUserList.push({
          ...action.payload,
          memberType: EMemberType.Member,
        });
      state.listUser = state.listUser.filter(
        (user) => user.id !== action.payload.id
      );
    },
    unSelectUser: (state, action) => {
      state.listUser = [action.payload, ...state.listUser];
      state.selectedUserList = state.selectedUserList.filter(
        (user) => user.id !== action.payload.id
      );
    },
    changeFilterUnSelectedUserList: (state, action) => {
      state.filterListUserUnSelected = action.payload;
    },
    changeMemberTypeUser: (state, action) => {
      const user = state.selectedUserList.find(
        (user) => user.id === action.payload.id
      );
      if (user) user.memberType = action.payload.memberType;
    },
    clearSelectedTaskList: (state) => {
      state.selectedTaskList = [];
    },
    clearSelectedUserList: (state) => {
      state.selectedUserList = [];
      state.projectEdit = null;
    },
    changeBillableAll: (state, action) => {
      state.selectedTaskList.map((task) => (task.isBillable = action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProject.fulfilled, (state, action) => {
      state.listProject = action.payload;
    });
    builder
      .addCase(addProjectThunk.fulfilled, (state, action) => {
        state.listProject = action.payload;
        toast.success("Create Project Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(addProjectThunk.rejected, () => {
        toast.error("Create Project Fail! Try Again", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    builder.addCase(getProjectEditing.fulfilled, (state, action) => {
      state.projectEdit = action.payload;
      action.payload.tasks.forEach((selectedTask: ISelectedTask) => {
        const task = state.unSelectedTaskList.find(
          (unSelectedTask) => unSelectedTask.id === selectedTask.taskId
        );
        if (task) {
          state.selectedTaskList.push({
            ...task,
            isBillable: selectedTask.billable,
            taskId: selectedTask.taskId,
          });
          state.unSelectedTaskList = state.unSelectedTaskList.filter(
            (unSelectedTask) => unSelectedTask.id !== task.id
          );
        }
      });
      action.payload.users.forEach((selectedUser: ISelectedUser) => {
        const user = state.listUser.find(
          (unSelectedUser) => unSelectedUser.id === selectedUser.userId
        );
        if (user) {
          state.selectedUserList.push({
            ...user,
            memberType: selectedUser.type,
            userId: selectedUser.userId,
          });
          state.listUser = state.listUser.filter(
            (unSelectedUser) => unSelectedUser.id !== user.id
          );
        }
      });
    });
    builder
      .addCase(EditProjectThunk.fulfilled, (state, action) => {
        state.listProject = action.payload;
        toast.success("Edit Project Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(EditProjectThunk.rejected, () => {
        toast.error("Edit Fail! Try again", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    builder
      .addCase(activeProject.fulfilled, (state, action) => {
        const projectActive = state.listProject.find(
          (project: IProject) => project.id === action.payload.id
        );

        if (projectActive) projectActive.status = 0;
        toast.success("Active Project Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(activeProject.rejected, () => {
        toast.error("Message Fail", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    builder
      .addCase(deactiveProject.fulfilled, (state, action) => {
        const projectDeActive = state.listProject.find(
          (project: IProject) => project.id === action.payload.id
        );
        if (projectDeActive) projectDeActive.status = 1;
        toast.success("DeActive Project Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(deactiveProject.rejected, () => {
        toast.error("Message Fail", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    builder
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.listProject = state.listProject.filter(
          (project) => project.id !== action.payload
        );
        toast.success("Delete Project Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(deleteProject.rejected, () => {});
    builder.addCase(
      getTimeSheetStatisticTasksThunk.fulfilled,
      (state, action) => {
        state.timeSheetStatisticTasks = action.payload;
      }
    );
    builder.addCase(
      getTimeSheetStatisticTeamsThunk.fulfilled,
      (state, action) => {
        state.timeSheetStatisticTeams = action.payload;
      }
    );
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      state.unSelectedTaskList = action.payload;
    });

    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.listUser = action.payload.items;
    });
  },
});
export const {
  changeStatusFilter,
  changeBillable,
  selectTask,
  deSelectTask,
  selectUser,
  unSelectUser,
  changeFilterUnSelectedUserList,
  changeMemberTypeUser,
  clearSelectedTaskList,
  clearSelectedUserList,
  changeBillableAll,
} = projectSlice.actions;
export default projectSlice.reducer;
