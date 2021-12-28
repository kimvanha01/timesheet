import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, MenuItem
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputField from 'src/components/CustomeField/InputField';
import SelectField from 'src/components/CustomeField/SelectField';
import { styleButtonSubmitForm } from 'src/components/CustomeStyleComponent/StyleButton';
import { styleDialogActions, styleDialogContent, styleDialogTitle } from 'src/components/CustomeStyleComponent/styleDialog';
import * as yup from "yup";
import { ETaskTypeForm, ITask, ITaskForm } from '../../redux/taskType';
import { postTask } from '../../redux/thunk';
interface Props {
    openDialog: boolean,
    handleClickCloseDialog: () => void,
    title: String,
    currentTask?: ITask,
}
const schema = yup.object().shape({
    name: yup.string().required()
})
const FormDialog = ({ openDialog, handleClickCloseDialog, title, currentTask }: Props) => {
    const dispatch = useDispatch();
    const defaultValues = {
        name: "",
        type: 0
    }
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });
    useEffect(() => {
        if (currentTask) {
            methods.reset({
                name: currentTask.name,
                type: currentTask.type
            })
        } else {
            methods.reset({
                name: "",
                type: 0
            })
        }
    }, [currentTask, methods]);
    const handleSubmitForm = (data: ITaskForm) => {
        const newTask = {
            ...data,
            isDeleted: false,
            id: currentTask?.id
        }
        dispatch(postTask(newTask));
        handleCloseDialog();

    };
    const handleCloseDialog = () => {
        handleClickCloseDialog();
        methods.reset();
    }
    const listTypeTask = [ETaskTypeForm.CommonTask, ETaskTypeForm.OtherTask].map((type, index) => {
        return (
            <MenuItem value={type} key={index}>
                {type === ETaskTypeForm.CommonTask ? "Common Task" : "Other Task"}
            </MenuItem>
        )
    })
    return (
        <>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(handleSubmitForm)}
                        noValidate >
                        <DialogTitle sx={styleDialogTitle}>{title}</DialogTitle>
                        <DialogContent sx={styleDialogContent}>
                            <InputField name="name" type="text" label="Name" required={true} />
                            <Box sx={{ my: 1.5 }} />
                            <SelectField label="Type Task" name="type" listItem={listTypeTask} />
                        </DialogContent>
                        <DialogActions sx={styleDialogActions}>
                            <Button
                                sx={styleButtonSubmitForm} onClick={handleCloseDialog}>Cancel</Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={styleButtonSubmitForm}
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
        </>
    );
}
export default FormDialog;