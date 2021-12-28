import * as React from 'react';
import { WarningAmber } from '@mui/icons-material';
import { styleButtonSubmitForm } from '../CustomeStyleComponent/StyleButton';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography, DialogActions, Button } from '@mui/material';
interface Props {
    isOpen: boolean,
    handleClickCloseDialog: () => void,
    handleConfirm: () => void,
    name?: string,
    actionType?: string
}
const ConfirmDialog = ({ isOpen, handleClickCloseDialog, handleConfirm, name, actionType }: Props) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClickCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{ textAlign: "center", minWidth: "450px", height: "auto", margin: "auto" }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ width: "320px" }} >
                <WarningAmber sx={{ width: "5em", height: "5em", color: "#f8bb86" }} />
                <Typography sx={{ fontSize: 28, fontWeight: 700, textAlign: 'center' }}> Are you sure ?</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ padding: "0 24px", fontWeight: 500 }}>
                    {actionType} task: '{name}?'
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ margin: "auto", padding: 0, marginBottom: "16px" }}>
                <Button onClick={handleClickCloseDialog} sx={{ color: "black" }}>Cancel</Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    sx={styleButtonSubmitForm}
                    onClick={handleConfirm}
                    autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ConfirmDialog;