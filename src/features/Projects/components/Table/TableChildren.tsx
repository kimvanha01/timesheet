import { Close, Delete, Edit, KeyboardArrowDown, Visibility } from "@mui/icons-material";
import { Button, Chip, Menu, MenuItem, Stack, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "./TableStyle";
import { EProjectType, IProject } from "../../redux/project.types";
import { activeProject, deactiveProject, deleteProject, getProjectEditing } from "../../redux/projectThunk";
import ConfirmDialog from "src/components/ConfirmDialog";
import { Box } from "@mui/system";
import DialogMainAddEdit from "../Dialog/AddEditProjectDialog/DialogMain";


interface Props {
    project: IProject;
}

export const ProjectItem = ({ project }: Props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isActiveConfirm, setIsActiveConfirm] = useState(false);
    const [currentProject, setCurrentProject] = useState<IProject | undefined>();
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const customDate = () => {
        let date = "";
        const timeStart = project.timeStart;
        const timeEnd = project.timeEnd;
        if (timeStart) date += moment(timeStart).format('L');
        if (date && timeEnd) date += " - ";
        if (timeEnd) date += moment(timeEnd).format('L');
        return date;
    };
    const convertToType = () => {
        switch (project.projectType) {
            case EProjectType.TM:
                return 'T&M';
            case EProjectType.FF:
                return 'Fixed Fee';
            case EProjectType.NB:
                return 'Non-Billable';
            case EProjectType.ODC:
                return 'ODC';
        }
    };
    const handlePms = () => {
        let pms = "";
        project.pms.forEach((item, index) => (pms += !index ? item : `, ${item}`));
        return pms;
    };

    // modal action
    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //edit
    const handleEdit = () => {
        dispatch(getProjectEditing(project.id))
        setIsEditMode(true);
    }
    const handleCloseDialogAddEdit = () => {
        setIsEditMode(false);
        handleClose();
    }

    // active|| deactive
    const handleChangeStatus = (id: number) => {
        if (project.status) dispatch(activeProject(id));
        else dispatch(deactiveProject(id));
        handleClose();
    }
    const handleClickActive = (project: IProject) => {
        setIsActiveConfirm(true);
        setCurrentProject(project);
    }
    const handleConfirmActive = () => {
        handleChangeStatus(project.id);
        handleCloseConfirm();
    }

    //delete
    const handleDeleteProject = (id: number) => {
        dispatch(deleteProject(id))
    }
    const handleClickDelete = (project: IProject) => {
        setIsDeleteConfirm(true);
        setCurrentProject(project);
    }
    const handleConfirmDelete = () => {
        handleDeleteProject(project.id);
        handleCloseConfirm();
    }

    //close dialog confirm
    const handleCloseConfirm = () => {
        setIsActiveConfirm(false);
        setIsDeleteConfirm(false);
        handleClose()
    }
    return (
        <>
            <TableRow className={classes.rowProject}>
                <TableCell component="th" scope="row" sx={{ width: '100%' }}>
                    <Stack direction="row" spacing={1}>
                        <Box sx={{ fontSize: 16 }}> {project.name}</Box>
                        <Chip label={handlePms()} color="info" size="small" />
                        <Chip label={`${project.activeMember} ${project.activeMember > 1 ? "members" : "member"}`} size="small" color="error" />
                        <Chip label={convertToType()} color="warning" size="small" />
                        <Chip label={customDate()} color="success" size="small" />
                    </Stack>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: "0 10px 0 0", textAlign: "right" }} className={classes.actionCell} >
                    <Stack direction="row" spacing={1} alignItems="center">
                        {!project.status
                            ? <Chip label="Active" color="success" size="small" />
                            : <Chip label="Inactive" color="default" size="small" />}
                        <Button
                            id="demo-customized-button"
                            variant="contained"
                            size="large"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDown />}
                            sx={{ fontSize: 14, textTransform: "none" }}
                        >
                            Actions
                        </Button>
                    </Stack>
                    <Menu
                        id="demo-customized-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleEdit}>
                            <Edit sx={{ mr: 1 }} />
                            Edit
                        </MenuItem>
                        <MenuItem>
                            <Link to={`/home/projects/${project.id}`} className={classes.actionLink}>
                                <Visibility sx={{ mr: 1 }} />
                                View
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={() => handleClickActive(project)}>
                            <Close sx={{ mr: 1 }} />
                            {project.status ? "Active" : "Deactive"}
                        </MenuItem>
                        <MenuItem onClick={() => handleClickDelete(project)} sx={{ color: "red" }}>
                            <Delete sx={{ mr: 1 }} />
                            Delete
                        </MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
            <DialogMainAddEdit
                isEditMode={isEditMode}
                openDialogAddEdit={isEditMode}
                handleCloseDialogAddEdit={handleCloseDialogAddEdit}
            />
            <ConfirmDialog
                isOpen={isActiveConfirm}
                handleConfirm={handleConfirmActive}
                handleClickCloseDialog={handleCloseConfirm}
                name={currentProject?.name}
                actionType={project.status ? "Active" : "Deactive"}
            />
            <ConfirmDialog
                isOpen={isDeleteConfirm}
                handleConfirm={handleConfirmDelete}
                handleClickCloseDialog={handleCloseConfirm}
                name={currentProject?.name}
                actionType="Delete"
            />
        </>
    );
};
