import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      display: "flex",
      alignItems: "center",
      marginBottom: 8,
    },
    helperText: {
      position: "absolute",
      bottom: -20,
    },
    textDatePicker: {
      margin: "0 10px !important",
    },
    inputControl: {
      fontSize: "14px",
      width: "240px",
      height: "auto",
    },
    formLabelControl: {
      display: "flex",
      alignItems: "center",
    },
    menuPaper: {
      maxHeight: 250,
    },
    formLabel: {
      fontWeight: 700,
      fontSize: 14,
    },
    dateForm: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    dateField: {
      width: "50%",
    },
    gridField: {
      alignItems: "center",
    },
  })
);
