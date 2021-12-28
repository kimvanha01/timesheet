import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 16,
    },
    title: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#202020",
      padding: "10px 10px 10px 20px",
    },
    tableContainer: {
      boxShadow: "none !important",
      padding: "0 20px",
    },
    table: {
      minWidth: 650,
    },
    btnTable: {
      color: "#202020",
      backgroundColor: "#fff",
    },
    divider: {},
    action: {
      margin: "16px 24px 0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tableTitle: {
      margin: "16px 24px 0 24px",
    },
  })
);
