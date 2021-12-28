import { Menu } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
interface Props {
    handleDrawerToggle: () => void
}
const Header = ({ handleDrawerToggle }: Props) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Timesheet
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
export default Header;