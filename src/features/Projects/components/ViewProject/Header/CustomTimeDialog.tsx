import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from "@mui/material";
import { useState } from "react";
import { styleDialogActions, styleDialogContent, styleDialogTitle } from "src/components/CustomeStyleComponent/styleDialog";
import { styleButtonSubmitForm } from '../../../../../components/CustomeStyleComponent/StyleButton';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleSave: (start: Date, end: Date) => void;
}

export const CustomTimeDialog = ({ isOpen, handleClose, handleSave }: Props) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const onSave = () => {
    if (startTime && endTime)
      handleSave(startTime, endTime)
  }
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle sx={styleDialogTitle}>Custome Date</DialogTitle>
      <DialogContent sx={styleDialogContent}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From Date"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
            }}
            renderInput={(params) => <TextField sx={{ marginBottom: "4px" }} margin="dense" size="small" variant="outlined" {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="To Date"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
            }}
            renderInput={(params) => <TextField size="small" margin="dense" variant="outlined" {...params} />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions sx={styleDialogActions}>
        <Button
          sx={styleButtonSubmitForm}
          onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={!(startTime && endTime)}
          onClick={onSave}
          color="primary"
          variant="contained"
          sx={styleButtonSubmitForm}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
