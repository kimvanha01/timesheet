import { Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createStyles, makeStyles } from "@mui/styles";
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuPaper: {
            maxHeight: 200,
        },
        checkboxControl: {
            marginLeft: "20px !important",
        },
        teamTabHeader: {
            marginBottom: 0,
        },
        userList: {
            boxShadow: `0 3px 1px -2px ${grey[500]}, 0 2px 2px 0 ${grey[400]}, 0 1px 5px 0 ${grey[300]}`,
            borderRadius: 4,
            padding: 16,
            marginBottom: 32
        },
        userItem: {
            borderBottom: `1px solid #c5c5c5`,
            padding: 8,
            marginBottom: 10,
        },
        userItemContent: {
            display: "flex",
            alignItems: "center",
        },
        userItemInfo: {
            marginLeft: 12,
            padding: "1px 5px",
            borderRadius: "10px",
            fontSize: 14,
        },
        bgUserName: {
            backgroundColor: "yellow",
        },
        bgBranch: {
            backgroundColor: "#f44336!important",
            color: "white !important",
            fontWeight: "bold"
        },
        bgType: {
            backgroundColor: "#2196f3!important",
            color: "white !important",
            fontWeight: "bold"
        },
        bgLevel: {
            backgroundColor: "rgb(119, 119, 119)",
            color: "white",
            fontWeight: "bold"
        },
        avtUser: {
            marginLeft: 12,
            marginRight: 12,
        },
        userListFilter: {
            display: "flex",
            justifyContent: "space-between",
        },
        formControl: {
            marginLeft: 8,
            width: 110,
            maxWidth: 300,
        },
        filterControl: {
            marginTop: 12,
        },
        searchControl: {
            marginLeft: 24,
            width: 400,
            padding: "15px !important"
        },
        selectedHeader: {
            justifyContent: 'space-between'
        }
    })
);
