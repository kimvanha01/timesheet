import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      boxShadow: "none !important",
      padding: "0 20px",
    },
    name: {
      paddingLeft: "0 !important",
      fontSize: 18,
    },
    cellEdit: {
      width: 95,
    },
    divider: {},
  })
);
