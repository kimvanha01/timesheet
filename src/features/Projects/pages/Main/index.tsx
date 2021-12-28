import { Add, Search } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Button, Divider,
    FormControl,
    Grid, IconButton, InputAdornment, InputLabel, MenuItem,
    OutlinedInput, Paper, Select, SelectChangeEvent, Toolbar, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleButtonAdd } from 'src/components/CustomeStyleComponent/StyleButton';
import { getAllTask } from 'src/features/Tasks/redux/thunk';
import { RootState } from 'src/store/store';
import theme from 'src/themes/theme';
import { styleMainBox, styleMainPaper } from '../../../../components/CustomeStyleComponent/styleLayout';
import DialogMainAddEdit from '../../components/Dialog/AddEditProjectDialog/DialogMain';
import TableProject from '../../components/Table/Table';
import { getAllCustomersThunk } from '../../redux/customer/customerThunk';
import { EStatusProject, IProject, IProjectState } from '../../redux/project.types';
import { changeStatusFilter, clearSelectedTaskList, clearSelectedUserList } from '../../redux/projectSlice';
import { getAllProject, getAllUser } from '../../redux/projectThunk';
import { useStyles } from './ProjectMainStyle';

const ProjectMain = () => {
    const statusFilter = useSelector(
        (state: IProjectState) => state.projects.filterStatus
    );
    let projectList = useSelector(
        (state: IProjectState) => state.projects.listProject
    )
    let listCustomer = useSelector((state: RootState) => state.customers.customerList);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProject());
        dispatch(getAllUser());
        dispatch(getAllCustomersThunk())
        dispatch(getAllTask())
    }, [dispatch])
    const handleChangeStatusFilter = (event: SelectChangeEvent<EStatusProject>) => {
        dispatch(changeStatusFilter(event.target.value));
    };
    const activeProject = projectList.filter((project: IProject) => !project.status).length;
    const deActiveProject = projectList.filter((project: IProject) => project.status).length;
    const allProject = projectList.length;
    const [openDialogAddEdit, setOpenDialogAddEdit] = React.useState(false);
    const [valueSearch, setValueSearch] = React.useState("");
    const handleAdd = () => {
        setOpenDialogAddEdit(true);
    };
    const handleCloseDialogAddEdit = () => {
        dispatch(clearSelectedTaskList())
        dispatch(clearSelectedUserList())
        setOpenDialogAddEdit(false);
    };
    const renderProjectList = (status: EStatusProject) => {
        let renderListProject: IProject[] = [];
        if (status === EStatusProject.All) {
            renderListProject = projectList
        } else if (status === EStatusProject.Active) {
            renderListProject = projectList.filter((project: IProject) => !project.status)
        } else {
            renderListProject = projectList.filter((project: IProject) => project.status)
        }
        return renderListProject;
    }
    const listProjectByCustomer = () => {
        return listCustomer.map((customer, index) => {
            let newProjectList = renderProjectList(statusFilter);
            let temp = newProjectList.filter(
                (project) => project.customerName === customer.name
            );
            const list = temp.filter(
                (project: IProject) =>
                    project.name.toUpperCase().includes(valueSearch.toUpperCase()) === true
            );
            if (list?.length) {
                return (
                    <TableProject
                        key={index}
                        projectListByCustomer={list}
                    />
                );
            }
            return null;
        });
    }
    return (
        <Box component="main" sx={styleMainBox}>
            <Toolbar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={styleMainPaper}>
                        <div className={classes.title}>
                            <Typography sx={{ fontSize: 18, fontWeight: 500, m: "4px" }}>Manage Projects</Typography>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </div>
                        <Divider className={classes.divider} />
                        <Grid container p={2.5}>
                            <Grid item md={2} xs={12} textAlign="left" >
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={styleButtonAdd}
                                    onClick={handleAdd}
                                >
                                    <Add />
                                    New Project
                                </Button>
                            </Grid>
                            <Grid item md={10} xs={12} sx={{
                                display: "flex",
                                [theme.default.breakpoints.down('md')]: {
                                    marginTop: 2,
                                    justifyContent: 'space-between'
                                }
                            }}>
                                <Grid item xs={6} md={4} sx={{
                                    [theme.default.breakpoints.down('md')]: {
                                        textAlign: 'left',
                                    }
                                }}>
                                    <FormControl variant="outlined" size="small" >
                                        <Select
                                            value={statusFilter}
                                            onChange={handleChangeStatusFilter}>
                                            <MenuItem
                                                value={EStatusProject.Active}
                                            >{`Active Projects (${activeProject})`}
                                            </MenuItem>
                                            <MenuItem
                                                value={EStatusProject.InActive}
                                            >{`DeActive Projects (${deActiveProject})`}
                                            </MenuItem>
                                            <MenuItem
                                                value={EStatusProject.All}
                                            >{`All Projects (${allProject})`}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <FormControl fullWidth size="small" variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-search">Search by Project name</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-search"
                                            onChange={(event) => setValueSearch(event.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Search by Project name"
                                                        edge="start"
                                                    >
                                                        <Search />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Search by Project name"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        {listProjectByCustomer()}
                    </Paper>
                </Grid>
            </Grid>
            <DialogMainAddEdit
                openDialogAddEdit={openDialogAddEdit}
                handleCloseDialogAddEdit={handleCloseDialogAddEdit}
            />
        </Box>
    );
}
export default ProjectMain;