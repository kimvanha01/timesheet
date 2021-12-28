import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 24,
    },
    main: {
      padding: "10px 30px 30px 30px",
    },
    title: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#202020",
      padding: "10px 10px 10px 20px",
    },
    btnTable: {
      color: "#202020",
      backgroundColor: "#fff",
    },
    divider: {},
    action: {
      margin: "16px 24px 16px 24px",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-start",
    },
    tableTitle: {
      margin: "24px 24px 0 24px",
    },
  })
);
