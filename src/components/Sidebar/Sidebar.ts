import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import bgProfile from "../../assets/img/bgProfile.jpg";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      boxShadow: "0 2px 5px rgb(0 0 0 / 20%)",
    },
    navLink: {
      textDecoration: "none",
      color: "#202020",
      fontWeight: "bold",
      fontSize: 14,
    },
    user: {
      color: "white",
      minHeight: "70px",
      backgroundImage: `url(${bgProfile})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      display: "flex",
      padding: "13px 10px",
      alignItems: "center",
    },
    avatar: {
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      margin: "0 10px",
    },
    infoUser: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      fontSize: 14,
    },
  })
);
