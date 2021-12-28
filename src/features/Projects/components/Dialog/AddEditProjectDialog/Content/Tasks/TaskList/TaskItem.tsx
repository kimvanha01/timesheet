import { AddCircleOutline, Close } from "@mui/icons-material";
import { Checkbox, Grid, IconButton } from "@mui/material";
import { ETaskList } from "src/features/Projects/redux/project.types";
import { ITask } from "src/features/Tasks/redux/taskType";
import { useStyles } from "./TaskTabStyle";
interface Props {
    type: ETaskList;
    task: ITask;
    onChangeBillable: (task: ITask) => void;
    handleSelectTask: (task: ITask) => void;
    handleDeSelectTask: (task: ITask) => void;
}
const TaskItem = ({ type, task, onChangeBillable, handleSelectTask, handleDeSelectTask }: Props) => {
    const classes = useStyles();
    return (
        <Grid container className={`${classes.borderBottom} ${classes.taskItem}`}>
            <Grid item xs={6} className={classes.taskContent}>
                {type === ETaskList.SelectedTaskList ? (
                    <IconButton onClick={() => handleDeSelectTask(task)}>
                        <Close />
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => handleSelectTask({ ...task, isBillable: true })}
                    >
                        <AddCircleOutline />
                    </IconButton>
                )}
                <div className={classes.taskName}>{task.name}</div>
            </Grid>
            <Grid item xs={6}>
                {type === ETaskList.SelectedTaskList ? (
                    <Checkbox
                        color="primary"
                        checked={task.isBillable}
                        onChange={() => onChangeBillable(task)}
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                ) : (
                    <div>{task.type ? "Other Task" : "Common Task"}</div>
                )}
            </Grid>
        </Grid>
    );
};
export default TaskItem;