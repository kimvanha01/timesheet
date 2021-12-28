import { AddBox, Assessment, Home, Logout } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/styles';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutSuccess } from '../../features/Auth/SignIn/SignInSlice';
import { removeToken } from '../../utils/localStorage';
import { useStyles } from './Sidebar';
const SelectedListItem = styled(ListItemButton)(({ theme }) => ({
    '& .MuiListItemButton-root': {
        '&.Mui-selected': {
            color: "red"
        }
    }
}))

interface Props {
    handleDrawerToggle: () => void;
}
export default function MainListItems({ handleDrawerToggle }: Props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        handleDrawerToggle();

    };
    const handleLogout = () => {
        removeToken();
        dispatch(logoutSuccess());
        history.push('/login');
    }
    return (
        <>
            <NavLink to="/home"
                className={classes.navLink}>
                <SelectedListItem
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="Home page" />
                </SelectedListItem>
            </NavLink>
            <NavLink to="/home/tasks"
                className={classes.navLink}>
                <SelectedListItem
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <AddBox />
                    </ListItemIcon>
                    <ListItemText primary="Tasks" />
                </SelectedListItem>
            </NavLink>
            <NavLink to="/home/projects"
                className={classes.navLink}>
                <SelectedListItem
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <Assessment />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                </SelectedListItem>
            </NavLink>
            <ListItem button key="Logout" onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </>
    )
};