import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    tableContainer: {
      boxShadow: "none !important",
      padding: "0 20px",
    },
    table: {
      minWidth: 650,
    },
    btnTable: {
      color: "#202020 !important",
      backgroundColor: "#fff !important",
      textTransform: "none",
    },
    name: {
      paddingLeft: "0 !important",
      fontSize: 18,
    },
    cellEdit: {
      width: 95,
    },
    divider: {},
    actionLink: {
      textDecoration: "none",
      color: "#202020",
      display: "flex",
      alignItems: "center",
    },
    actionCell: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
    rowProject: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);
