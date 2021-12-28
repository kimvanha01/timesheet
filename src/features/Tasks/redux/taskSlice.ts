import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IListTask, ITask } from "./taskType";
import {
  archiveTask,
  deArchiveTask,
  deleteTask,
  getAllTask,
  postTask,
} from "./thunk";

const initialState: IListTask = {
  listTask: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      state.listTask = action.payload;
    });
    builder
      .addCase(postTask.fulfilled, (state, action) => {
        const taskEdit = state.listTask.find(
          (task) => task.id === action.payload.id
        );
        if (taskEdit) {
          taskEdit.name = action.payload.name;
          taskEdit.type = action.payload.type;
          toast.success("Message successful", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          const newTask = action.payload;
          state.listTask.push(newTask);
          toast.success("Message successful", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .addCase(postTask.rejected, () => {
        toast.error("Message Fail", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    builder
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.listTask = state.listTask.filter(
          (task: ITask) => task.id !== action.payload
        );
        toast.success("Message successful", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(deleteTask.rejected, () => {
        toast.error("Message Fail", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
    builder
      .addCase(archiveTask.fulfilled, (state, action) => {
        const taskArchive = state.listTask.find(
          (task) => task.id === action.payload
        );
        if (taskArchive) {
          taskArchive.isDeleted = true;
        }
        toast.success("Message successful", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(archiveTask.rejected, () => {});
    builder
      .addCase(deArchiveTask.fulfilled, (state, action) => {
        const taskDeArchive = state.listTask.find(
          (task) => task.id === action.payload
        );
        if (taskDeArchive) {
          taskDeArchive.isDeleted = false;
        }
        toast.success("Message successful", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(deArchiveTask.rejected, () => {
        toast.error("Message Fail", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  },
});

export default taskSlice.reducer;
