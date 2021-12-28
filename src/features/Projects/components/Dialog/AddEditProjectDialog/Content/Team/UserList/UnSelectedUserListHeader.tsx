import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ExpandLess, ExpandMore, Search } from '@mui/icons-material';
import { useStyles } from "../TeamTabStyle";
import { EBranchUser, ELevelUser, ETypeUser } from "src/features/Projects/redux/user.types";
import { changeFilterUnSelectedUserList } from "src/features/Projects/redux/projectSlice";
interface Props {
    handleClick: () => void,
    open: boolean
}
export const branchList = [
    {
        text: "All",
        value: EBranchUser.All,
    },
    {
        text: "Ha Noi",
        value: EBranchUser.HaNoi,
    },
    {
        text: "Da Nang",
        value: EBranchUser.DaNang,
    },
    {
        text: "Ho Chi Minh",
        value: EBranchUser.HoChiMinh,
    },
];

export const typeUserList = [
    {
        text: "All",
        value: ETypeUser.All,
    },
    {
        text: "Staff",
        value: ETypeUser.Staff,
    },
    {
        text: "InternShip",
        value: ETypeUser.InternShip,
    },
    {
        text: "Collaborator",
        value: ETypeUser.Collaborator,
    },
];

export const levelUserList = [
    {
        text: "All",
        value: ELevelUser.All,
    },
    {
        text: "Intern_0",
        value: ELevelUser.Intern0,
    },
    {
        text: "Intern_1",
        value: ELevelUser.Intern1,
    },
    {
        text: "Intern_2",
        value: ELevelUser.Intern2,
    },
    {
        text: "Prefresher",
        value: ELevelUser.Prefresher,
    },
    {
        text: "Fresher-",
        value: ELevelUser.Fresher0,
    },
    {
        text: "Fresher",
        value: ELevelUser.Fresher1,
    },
    {
        text: "Fresher+",
        value: ELevelUser.Fresher2,
    },
    {
        text: "Junior-",
        value: ELevelUser.Junior0,
    },
    {
        text: "Junior",
        value: ELevelUser.Junior1,
    },
    {
        text: "Junior+",
        value: ELevelUser.Junior2,
    },
    {
        text: "Middle-",
        value: ELevelUser.Middle0,
    },
    {
        text: "Middle",
        value: ELevelUser.Middle1,
    },
    {
        text: "Middle+",
        value: ELevelUser.Middle2,
    },
    {
        text: "Senior-",
        value: ELevelUser.Senior0,
    },
    {
        text: "Senior",
        value: ELevelUser.Senior1,
    },
    {
        text: "Senior+",
        value: ELevelUser.Senior2,
    },
];

export const UnSelectedUserListHeader = ({ handleClick, open }: Props) => {
    const [branch, setBranch] = useState(EBranchUser.All);
    const [type, setType] = useState(ETypeUser.All);
    const [level, setLevel] = useState(ELevelUser.All);
    const [search, setSearch] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            changeFilterUnSelectedUserList({
                branch,
                type,
                level,
                search,
            })
        );
    }, [branch, type, level, search, dispatch]);
    return (
        <Grid container className={classes.teamTabHeader} sx={{ marginTop: "25px" }}>
            <Grid item xs={12}
                sx={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                onClick={handleClick}>
                <b>Select team member</b>
                {open ? <ExpandLess /> : <ExpandMore />}
            </Grid>
            <Grid container className={classes.filterControl}>
                <Grid item xs={6} className={classes.userListFilter}>
                    <FormControl variant="standard" className={classes.formControl}>
                        <InputLabel shrink>Branch</InputLabel>
                        <Select
                            value={branch}
                            onChange={(e) => setBranch(e.target.value as EBranchUser)}
                        >
                            {branchList.map((branch, index) => (
                                <MenuItem key={index} value={branch.value}>{branch.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value as unknown as number)}
                        >
                            {typeUserList.map((typeUser, index) => (
                                <MenuItem key={index} value={typeUser.value}>{typeUser.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" className={classes.formControl}>
                        <InputLabel shrink>Level</InputLabel>
                        <Select
                            value={level}
                            onChange={(e) => setLevel(e.target.value as unknown as number)}
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                            {levelUserList.map((levelUser, index) => (
                                <MenuItem key={index} value={levelUser.value}>{levelUser.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <TextField
                        className={classes.searchControl}
                        placeholder="Search by name"
                        variant="standard"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};
