import { Add, Search } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Button, Divider, FormControl,
    Grid, IconButton, InputAdornment,
    InputLabel, OutlinedInput, Paper,
    Toolbar, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ETaskType, ITask } from './redux/taskType';
import { getAllTask } from './redux/thunk';
import FormDialog from './components/TaskDialog';
import TaskTable from './components/TaskTable';
import { useStyles } from './TaskStyle';
import { RootState } from 'src/store/store';
import { styleButtonAdd } from 'src/components/CustomeStyleComponent/StyleButton';
import { styleMainBox, styleMainPaper } from '../../components/CustomeStyleComponent/styleLayout';
const Task = () => {
    const taskList = useSelector((state: RootState) => state.tasks.listTask);
    const [openDialog, setOpenDialog] = useState(false);
    const [inputSearch, setInputSearch] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTask());
    }, [dispatch])

    const taskCommon = () => {
        const list: Array<ITask> = taskList.filter((task: ITask) => !task.type)
        return list.filter((task: ITask) => task.name.toLowerCase().includes(inputSearch.toLowerCase()) === true);
    }
    const numberTaskCommon: number = taskCommon().length;

    const taskOther = () => {
        const list: Array<ITask> = taskList.filter((task: ITask) => task.type)
        return list.filter((task: ITask) => task.name.toLowerCase().includes(inputSearch.toLowerCase()) === true);
    }
    const numberTaskOther: number = taskOther().length;

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleClickCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <Box component="main" sx={styleMainBox}>
            <Toolbar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={styleMainPaper}>
                        <div className={classes.title}>
                            <Typography sx={{ fontSize: 18, fontWeight: 500, m: "4px" }}>Manage Tasks</Typography>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </div>
                        <Divider className={classes.divider} />
                        <div className={classes.action}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={styleButtonAdd}
                            >
                                <Add />
                                New Task
                            </Button>
                            <FormControl variant="outlined" size="small">
                                <InputLabel htmlFor="outlined-adornment-search">Search by Task name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-search"
                                    onChange={(event) => setInputSearch(event.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Search by Task name"
                                                edge="start"
                                            >
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Search by Task name"
                                />
                            </FormControl>
                        </div>
                        <div className={classes.tableTitle}>
                            <Typography variant="h6" align='left' mb={1} ml={1}>{ETaskType.CommonTask} ({numberTaskCommon})</Typography>
                            <Typography align='left' mb={3} ml={1}>These tasks are automatically added to all new projects</Typography>
                            <Divider />
                        </div>
                        <TaskTable
                            hasArchive={true}
                            listTask={taskCommon()}
                        />
                        <div className={classes.tableTitle}>
                            <Typography variant="h6" align='left' mb={1} ml={1} >{ETaskType.OtherTask}({numberTaskOther})</Typography>
                            <Typography align='left' mb={3} ml={1}>These task must be manually added to projects</Typography>
                            <Divider />
                        </div>
                        <TaskTable
                            hasArchive={false}
                            listTask={taskOther()}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <FormDialog
                openDialog={openDialog}
                handleClickCloseDialog={handleClickCloseDialog}
                title="Add New Task"
            />
        </Box>
    );
}
export default Task;