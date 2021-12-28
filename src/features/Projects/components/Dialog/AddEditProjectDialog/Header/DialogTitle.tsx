import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { IProjectForm } from 'src/features/Projects/redux/project.types';
interface DialogTitleProps {
    projectEdit: IProjectForm | null;
    isEditMode?: boolean,
    onClose: () => void;
}
const ProjectDialogTitle = ({ projectEdit, isEditMode, onClose }: DialogTitleProps) => {
    return (
        <DialogTitle sx={{ m: 0, p: 2 }}>
            {projectEdit && isEditMode
                ? `Edit Project: ${projectEdit?.name}`
                : "Create Project"}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: "grey",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};
export default ProjectDialogTitle;