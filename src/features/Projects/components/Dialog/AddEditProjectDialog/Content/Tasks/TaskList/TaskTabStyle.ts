import { Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskContent: {
      display: "flex",
      alignItems: "center",
    },
    taskName: {
      marginLeft: 12,
    },
    borderBottom: {
      borderBottom: `1px solid #c5c5c5`,
      marginBottom: 0,
      paddingBottom: "8px",
    },
    listTaskChoose: {
      borderBottom: `1px solid #c5c5c5`,
      marginBottom: 0,
      cursor: "pointer",
    },
    taskItem: {
      padding: "4px 10px",
      display: "flex",
      alignItems: "center",
    },
    taskList: {
      boxShadow: `0 3px 1px -2px ${grey[500]}, 0 2px 2px 0 ${grey[400]}, 0 1px 5px 0 ${grey[300]}`,
      borderRadius: 4,
      padding: 16,
      marginBottom: 32,
    },
  })
);
