import { Add } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
    Button, FormControl,
    Grid, InputLabel,
    MenuItem, Select
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CheckBoxField from 'src/components/CustomeField/CheckBoxField';
import DateField from 'src/components/CustomeField/DateField';
import InputField from 'src/components/CustomeField/InputField';
import SelectField from 'src/components/CustomeField/SelectField';
import { styleButtonAdd } from 'src/components/CustomeStyleComponent/StyleButton';
import { postCustomerThunk } from 'src/features/Projects/redux/customer/customerThunk';
import { ICustomer } from 'src/features/Projects/redux/customer/customerType';
import { EProjectType, IProjectForm } from 'src/features/Projects/redux/project.types';
import { RootState } from 'src/store/store';
import AddClientDialog from '../../../ClientDialog/AddClientDialog';
import { useStyles } from './GeneralStyle';
interface Props {
    projectEdit: IProjectForm | null,
    isEditMode?: boolean
}
function GeneralTab({ projectEdit, isEditMode }: Props) {
    const classes = useStyles();
    const customerList = useSelector((state: RootState) => state.customers.customerList);
    const dispatch = useDispatch();
    const {
        control,
        reset,
    } = useFormContext();
    useEffect(() => {
        if (isEditMode && projectEdit) {
            reset({
                name: projectEdit.name,
                customerId: projectEdit.customerId,
                code: projectEdit.code,
                timeStart: projectEdit.timeStart,
                timeEnd: projectEdit.timeEnd,
                note: projectEdit.note,
                isAllUserBelongTo: projectEdit.isAllUserBelongTo,
                projectType: projectEdit.projectType,
            })
        }
    }, [projectEdit, reset, isEditMode])

    const showCustomerList = customerList.map((customer) => (
        <MenuItem value={customer.id} key={customer.id}>
            {customer.name}
        </MenuItem>
    ));
    const [openDialogClient, setOpenDialogClient] = React.useState(false);
    const handleOpenDialogClient = () => {
        setOpenDialogClient(true);
    };
    const handleCloseDialogClient = () => {
        setOpenDialogClient(false);
    };
    const handleSaveClient = (customer: ICustomer) => {
        dispatch(postCustomerThunk(customer));
        handleCloseDialogClient();
    }
    return (
        <>
            <Grid container mb={3} className={classes.gridField} >
                <Grid item xs={2}>
                    <InputLabel classes={{ root: classes.formLabel }}>Client</InputLabel>
                </Grid>
                <Grid item xs={4}>
                    <SelectField label="Client" name="customerId" listItem={showCustomerList} required={true} />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        onClick={handleOpenDialogClient}
                        sx={styleButtonAdd}
                    >
                        <Add /> New Client
                    </Button>
                </Grid>
            </Grid>
            <Grid container mb={3} className={classes.gridField}>
                <Grid item xs={2}>
                    <InputLabel classes={{ root: classes.formLabel }}>Project Name</InputLabel>
                </Grid>
                <Grid item xs={10}>
                    <InputField label="Project Name" name="name" type="text" required={true} />
                </Grid>
            </Grid>
            <Grid container mb={3} className={classes.gridField} >
                <Grid item xs={2}>
                    <InputLabel classes={{ root: classes.formLabel }}>Project Code</InputLabel>
                </Grid>
                <Grid item xs={10}>
                    <InputField label="Project Code" name="code" type="text" required={true} />
                </Grid>
            </Grid>
            <Grid container mb={3} className={classes.gridField}>
                <Grid item xs={2}>
                    <InputLabel classes={{ root: classes.formLabel }}>Dates</InputLabel>
                </Grid>
                <Grid item xs={10}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                            <DateField name="timeStart" label="Start Date" />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <DateField name="timeEnd" label="End Date" />
                        </Stack>
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid container mb={3} className={classes.gridField} >
                <Grid item xs={2}>
                    <InputLabel classes={{ root: classes.formLabel }}>Note</InputLabel>
                </Grid>
                <Grid item xs={10}>
                    <InputField label="Note anything..." name="note" type="text" required={false} />
                </Grid>
            </Grid>
            <Grid container mb={3} className={classes.gridField} >
                <Grid item xs={2}>
                    <InputLabel classes={{ root: classes.formLabel }}>All User</InputLabel>
                </Grid>
                <Grid item xs={10}>
                    <CheckBoxField
                        name="isAllUserBelongTo"
                        label="Auto add user as a member of this project when creating new user"
                    />
                </Grid>
            </Grid>
            <Grid container mb={3} className={classes.gridField} >
                <Grid item xs={2}>
                    <InputLabel classes={{ root: classes.formLabel }}>Prject Type</InputLabel>
                </Grid>
                <Grid item xs={10}>
                    <Controller
                        control={control}
                        defaultValue={0}
                        name="projectType"
                        render={({ field }) => (
                            <FormControl className={classes.inputControl}>
                                <Select {...field} size="small">
                                    <MenuItem value={EProjectType.TM}>Time & Materials</MenuItem>
                                    <MenuItem value={EProjectType.FF}>Fixed Fee</MenuItem>
                                    <MenuItem value={EProjectType.NB}>Non-Billable</MenuItem>
                                    <MenuItem value={EProjectType.ODC}>ODC</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>

            <AddClientDialog
                openDialogClient={openDialogClient}
                handleCloseDialogClient={handleCloseDialogClient}
                handleSaveClient={handleSaveClient}
            />
        </>
    );
}

export default GeneralTab;