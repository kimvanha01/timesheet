import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { styleButtonSubmitForm } from 'src/components/CustomeStyleComponent/StyleButton';
import { EProjectType, IProjectForm } from 'src/features/Projects/redux/project.types';
import { clearSelectedTaskList, clearSelectedUserList } from 'src/features/Projects/redux/projectSlice';
import { addProjectThunk, EditProjectThunk, getAllUser } from 'src/features/Projects/redux/projectThunk';
import { getAllTask } from 'src/features/Tasks/redux/thunk';
import { RootState } from 'src/store/store';
import * as yup from "yup";
import ProjectDialogTitle from './Header/DialogTitle';
import ProjectTabAddEdit from './Tab/ProjectTabAddEdit';
export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        maxWidth: 900,
        width: 900,
        height: "auto"
    },
    '& .MuDialogContent-root': {
        padding: theme.spacing(2),
        maxWidth: 800
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface Props {
    isEditMode?: boolean,
    openDialogAddEdit: boolean,
    handleCloseDialogAddEdit: () => void
}
export default function DialogMainAddEdit({ openDialogAddEdit, handleCloseDialogAddEdit, isEditMode }: Props) {
    const selectedTaskList = useSelector((state: RootState) => state.projects.selectedTaskList);
    const selectedUserlist = useSelector((state: RootState) => state.projects.selectedUserList);
    const projectEdit = useSelector((state: RootState) => state.projects.projectEdit);
    const taskListPost = selectedTaskList.map((task) => ({
        taskId: task.taskId ? task.taskId : task.id,
        billable: task.isBillable,
    }));
    const userListPost = selectedUserlist.map((user) => ({
        userId: user.userId ? user.userId : user.id,
        type: user.memberType,
    }));
    const descriptionElementRef = React.useRef<HTMLElement>(null);
    const defaultValues = {
        name: "",
        customerId: 0,
        code: "",
        timeStart: "",
        timeEnd: "",
        note: "",
        isAllUserBelongTo: false,
        projectType: EProjectType.TM,
    };
    const schema = yup.object().shape({
        customerId: yup.number().required(),
        name: yup.string().required(),
        code: yup.string().required(),
    });
    const methods = useForm<IProjectForm>({
        resolver: yupResolver(schema),
        defaultValues
    });
    const dispatch = useDispatch();
    const onSubmit = (data: IProjectForm) => {
        if (!selectedTaskList.length) {
            toast.error("You must have at least one task", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });

        } else if (!selectedUserlist.length) {
            toast.error("You must have at least one member", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        else {
            const project = {
                name: data.name,
                code: data.code,
                timeStart: new Date(data.timeStart ? data.timeStart : "").toDateString(),
                timeEnd: new Date(data.timeEnd ? data.timeEnd : "").toDateString(),
                note: data.note,
                projectType: data.projectType,
                customerId: data.customerId,
                tasks: taskListPost,
                users: userListPost,
                projectTargetUsers: [],
                isAllUserBelongTo: data.isAllUserBelongTo,
            }
            if (projectEdit) {
                dispatch(EditProjectThunk({ ...project, id: projectEdit.id }))

            } else {
                dispatch(addProjectThunk(project))
            }
            handleCloseDialog();
        }
    }
    const handleCloseDialog = () => {
        handleCloseDialogAddEdit();
        dispatch(clearSelectedTaskList())
        dispatch(clearSelectedUserList())
        dispatch(getAllTask())
        dispatch(getAllUser())
        methods.reset(defaultValues);
    };
    return (
        <FormProvider {...methods} >
            <BootstrapDialog
                onClose={handleCloseDialog}
                open={openDialogAddEdit}>
                <ProjectDialogTitle projectEdit={projectEdit} isEditMode={isEditMode} onClose={handleCloseDialog} />
                <form id="myForm" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <DialogContent dividers ref={descriptionElementRef} tabIndex={-1} sx={{ maxHeight: "465px" }}>
                        <ProjectTabAddEdit projectEdit={projectEdit} isEditMode={isEditMode} />
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            sx={styleButtonSubmitForm}
                            onClick={handleCloseDialog}
                        >
                            Canel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            autoFocus
                            sx={styleButtonSubmitForm}
                            type="submit">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </FormProvider >
    );
}