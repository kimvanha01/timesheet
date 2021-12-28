import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ETaskList } from "src/features/Projects/redux/project.types";
import { getAllTask } from "src/features/Tasks/redux/thunk";
import { RootState } from "src/store/store";
import TaskList from "./TaskList/TaskList";
interface Props {
    isEditMode?: boolean
}
const TasksTab = ({ isEditMode }: Props) => {
    const taskList = useSelector((state: RootState) => state.projects.unSelectedTaskList);
    const selectedTaskList = useSelector((state: RootState) => state.projects.selectedTaskList);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isEditMode) {
            dispatch(getAllTask());
        }
    }, [dispatch, isEditMode])
    return (
        <>
            <TaskList type={ETaskList.SelectedTaskList} taskList={selectedTaskList} />
            <TaskList type={ETaskList.UnSelectedTaskList} taskList={taskList} />
        </>
    );
};
export default TasksTab;