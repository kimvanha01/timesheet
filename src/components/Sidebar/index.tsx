import { Divider, Drawer, List, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import avatar from '../../assets/img/avatar.jpg';
import { drawerWidth } from '../../constants/constant';
import MainListItems from './ListItem';
import { useStyles } from './Sidebar';
import { RootState } from '../../store/store';
import { getCurrentUserLogged } from 'src/features/Auth/SignIn/userSlice';
interface Props {
    isOpen: boolean,
    handleDrawerToggle: () => void,
    window?: () => Window;
}
const SideBar = ({ window, isOpen, handleDrawerToggle }: Props) => {
    const classes = useStyles();
    const nameUser = useSelector((state: RootState) => state.user.name);
    const emailUser = useSelector((state: RootState) => state.user.emailAddress);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUserLogged())
    }, [dispatch]);
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                container={container}
                variant="temporary"
                open={isOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", md: 'none', },
                    boxShadow: "0 2px 10px rgb(0 0 0 / 20%)",
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <div className={classes.user}>
                        <img className={classes.avatar} src={avatar} alt="avt" />
                        <div className={classes.infoUser}>
                            <div>{nameUser}</div>
                            <div>{emailUser}</div>
                        </div>
                    </div>
                    <Divider />
                    <List>
                        <MainListItems handleDrawerToggle={handleDrawerToggle} />
                    </List>
                </Box>
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    boxShadow: "0 2px 10px rgb(0 0 0 / 20%)",
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <div className={classes.user}>
                        <img className={classes.avatar} src={avatar} alt="avt" />
                        <div className={classes.infoUser}>
                            <div>{nameUser}</div>
                            <div>{emailUser}</div>
                        </div>
                    </div>
                    <Divider />
                    <List>
                        <MainListItems handleDrawerToggle={handleDrawerToggle} />
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
export default SideBar;
