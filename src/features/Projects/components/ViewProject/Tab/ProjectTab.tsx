import { Theme } from "@mui/material";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { createStyles, makeStyles } from "@mui/styles";
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { ETabType } from "src/features/Projects/redux/project.types";
import TabChildren from './TabChildren';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, width: '100%' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btnTab: {
            width: 80,
            fontSize: "16px",
            textTransform: 'none'
        }
    }));
function tabProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
export default function ProjectTab() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                variant="fullWidth"
                sx={{ maxWidth: 200 }}
            >
                <Tab className={classes.btnTab} label="Tasks" {...tabProps(0)} />
                <Tab className={classes.btnTab} label="Team" {...tabProps(1)} />
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <TabChildren type={ETabType.Tasks} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <TabChildren type={ETabType.Teams} />
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}