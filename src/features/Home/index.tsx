import { CssBaseline, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Header from 'src/components/Header';
import SideBar from 'src/components/Sidebar';
import Project from '../Projects';
import Task from '../Tasks';

interface Props {
    window?: () => Window;
}

export default function HomePage({ window }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const handleDrawerToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header handleDrawerToggle={handleDrawerToggle} />
            <SideBar
                isOpen={isOpen}
                handleDrawerToggle={handleDrawerToggle}
                window={window}
            />
            <Switch>
                <Redirect exact from="/home" to="/home/homePage" />
                <Route exact path={`/home/homePage`}>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Toolbar />
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                            donec massa sapien faucibus et molestie ac.
                        </Typography>
                    </Box>
                </Route>
                <Route exact path={`/home/tasks`}>
                    <Task />
                </Route>
                <Route component={Project} />
            </Switch>
        </Box>
    );
}

