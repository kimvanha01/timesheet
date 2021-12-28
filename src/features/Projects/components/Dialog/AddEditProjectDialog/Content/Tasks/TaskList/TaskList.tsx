import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Grid, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ETaskList } from 'src/features/Projects/redux/project.types';
import { changeBillable, changeBillableAll, deSelectTask, selectTask } from 'src/features/Projects/redux/projectSlice';
import { ITask } from 'src/features/Tasks/redux/taskType';
import TaskItem from './TaskItem';
import { useStyles } from './TaskTabStyle';
interface Props {
    type: ETaskList,
    taskList: ITask[]
}
function TaskList({ type, taskList }: Props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const onChangeBillable = (task: ITask) => {
        dispatch(changeBillable(task.id));
    };
    const handleDeSelectTask = (task: ITask) => {
        dispatch(deSelectTask(task))
    }
    const handleSelectTask = (task: ITask) => {
        dispatch(selectTask(task))
    }
    const handleBillableAll = (billableAll: boolean) => {
        dispatch(changeBillableAll(billableAll));
    };
    const onChangeAll = () => {
        if (taskList.length)
            return taskList.every((task) => task.isBillable)
        return false;
    }
    return (
        <div className={classes.taskList}>
            {type === ETaskList.SelectedTaskList ? (
                <Grid container className={classes.borderBottom}>
                    <Grid item xs={6}>
                        <b>Tasks</b>
                    </Grid>
                    <Grid item xs={6}>
                        <Box >
                            <Box fontWeight="bold">Billable</Box>
                            <Checkbox
                                sx={{ p: 0 }}
                                color="primary"
                                checked={onChangeAll()}
                                onChange={(event) => handleBillableAll(event.target.checked)}
                                inputProps={{ "aria-label": "primary checkbox" }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <Grid container className={classes.listTaskChoose} onClick={handleClick}>
                    <Grid item xs={11}>
                        <b>Select Task</b>
                    </Grid>
                    <Grid item xs={1}>
                        <div >
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </div>
                    </Grid>
                </Grid>
            )}
            <Collapse in={open} timeout="auto" unmountOnExit>
                {taskList.map((task: ITask) => (
                    <TaskItem
                        type={type}
                        key={task.id}
                        task={task}
                        onChangeBillable={onChangeBillable}
                        handleDeSelectTask={handleDeSelectTask}
                        handleSelectTask={handleSelectTask}
                    />
                ))}
            </Collapse>
        </div>
    );
}

export default TaskList;