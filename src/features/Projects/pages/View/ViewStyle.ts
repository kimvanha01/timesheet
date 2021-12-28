import { createStyles, makeStyles } from "@mui/styles";
import theme from "../../../../themes/theme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 24,
    },
    paper: {
      textAlign: "center",
      color: theme.default.palette.primary.main,
      boxShadow: "0 2px 10px rgb(0 0 0 / 20%)",
    },
    title: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#202020",
      padding: "10px 10px 10px 20px",
    },
  })
);
