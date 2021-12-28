import React from 'react';
import {
    DialogActions, DialogContent,
    DialogTitle,
    Button, Dialog
} from '@mui/material';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { ICustomer } from 'src/features/Projects/redux/customer/customerType';
import { styleButtonSubmitForm } from 'src/components/CustomeStyleComponent/StyleButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { toast } from 'react-toastify';
import InputField from 'src/components/CustomeField/InputField';
import { styleDialogActions, styleDialogContent, styleDialogTitle } from 'src/components/CustomeStyleComponent/styleDialog';
const schema = yup.object().shape({
    name: yup.string().required(),
});

interface Props {
    openDialogClient: boolean,
    handleCloseDialogClient: () => void,
    handleSaveClient: (customer: ICustomer) => void
}
function AddClientDialog({ openDialogClient, handleCloseDialogClient, handleSaveClient }: Props) {
    const listCustomer = useSelector((state: RootState) => state.customers.customerList)
    const defaultValues = {
        name: "",
        address: ""
    }
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });
    const onSave = (data: ICustomer) => {
        const temp = listCustomer.find((customer) => customer.name === data.name);
        if (temp) {
            toast.error('Client name is exist!', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } else {
            handleSaveClient({
                ...data,
            });
            methods.reset();
            handleCloseDialogClient();
        }
    };
    return (
        <>
            <Dialog open={openDialogClient} onClose={handleCloseDialogClient}>
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSave)}
                        noValidate>
                        <DialogTitle sx={styleDialogTitle}>Add Client</DialogTitle>
                        <DialogContent sx={styleDialogContent}>
                            <InputField label="Name" name="name" type="text" required={true} />
                            <InputField label="Address" name="address" type="text" />
                        </DialogContent>
                        <DialogActions sx={styleDialogActions}>
                            <Button onClick={handleCloseDialogClient} sx={styleButtonSubmitForm}>Cancel</Button>
                            <Button type="submit" variant="contained" sx={styleButtonSubmitForm}>Save</Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
        </>
    );
}

export default AddClientDialog;