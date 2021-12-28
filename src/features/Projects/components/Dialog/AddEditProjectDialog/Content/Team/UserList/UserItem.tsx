import { AddCircleOutline, Close } from "@mui/icons-material";
import { Avatar, Chip, FormControl, Grid, IconButton, MenuItem, Select, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { EMemberType, EUserList, IUser } from "src/features/Projects/redux/project.types";
import { changeMemberTypeUser, selectUser, unSelectUser } from "src/features/Projects/redux/projectSlice";
import { EBranchUser, ELevelUser, ETypeUser } from "src/features/Projects/redux/user.types";
import { useStyles } from "../TeamTabStyle";
import { branchList, levelUserList, typeUserList } from "./UnSelectedUserListHeader";
interface Props {
    type: string;
    user: IUser;
    isShowDeActiveMember: boolean;
}
export const UserItem = ({ type, user, isShowDeActiveMember }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleChangeMemberType = (value: number) => {
        dispatch(changeMemberTypeUser({ id: user.id, memberType: value }));
    };

    const renderBranchUser = (branch: EBranchUser | null) => {
        const branchUser = branchList.find((user) => user.value === branch);
        return branchUser?.text ? <Chip label={branchUser.text} size="small" color="error" /> : null
    }
    const renderTypeUser = (type: ETypeUser | null) => {
        const typeUser = typeUserList.find((user) => user.value === type);
        return typeUser?.text ? <Chip label={typeUser.text} size="small" color="info" /> : null
    }
    const renderLevel = (level: ELevelUser | null) => {
        const temp = levelUserList.find((item => item.value === level))
        return temp?.text ? <Chip label={temp.text} size="small" /> :
            null
    }
    return (
        <>
            {type === EUserList.UnSelectedUserList ||
                (type === EUserList.SelectedUserList &&
                    isShowDeActiveMember) ||
                (type === EUserList.SelectedUserList &&
                    !isShowDeActiveMember &&
                    user.memberType !== 3) ? (
                <Grid container className={classes.userItem}>
                    <Grid item xs={9} className={classes.userItemContent}>
                        {type === EUserList.SelectedUserList ? (
                            <IconButton onClick={() => dispatch(unSelectUser(user))}>
                                <Close />
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => dispatch(selectUser(user))}>
                                <AddCircleOutline />
                            </IconButton>
                        )}
                        <Avatar
                            className={classes.avtUser}
                            alt="avt-user"
                            src={
                                user.avatarPath
                                    ? `http://dev.timesheetapi.nccsoft.vn/avatars/${user.avatarPath}`
                                    : "http://dev.timesheet.nccsoft.vn/assets/images/undefine.png"
                            }
                        />
                        <Stack direction="row" spacing={1}>
                            <span>{user.fullName}</span>
                            {renderBranchUser(user.branch)}
                            {renderTypeUser(user.type)}
                            {renderLevel(user.level)}
                        </Stack>

                    </Grid>
                    <Grid item xs={3}>
                        {type === EUserList.SelectedUserList ? (
                            <FormControl fullWidth>
                                <Select
                                    value={user.memberType}
                                    size="small"
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) => handleChangeMemberType(e.target.value as number)}
                                >
                                    <MenuItem value={EMemberType.Member}>Member</MenuItem>
                                    <MenuItem value={EMemberType.ProjectManager}>
                                        Project Manager
                                    </MenuItem>
                                    <MenuItem value={EMemberType.Shadow}>Shadow</MenuItem>
                                    <MenuItem value={EMemberType.DeActive}>DeActive</MenuItem>
                                </Select>
                            </FormControl>
                        ) : (
                            null
                        )}
                    </Grid>
                </Grid>
            ) : (
                <></>
            )}
        </>
    );
};
