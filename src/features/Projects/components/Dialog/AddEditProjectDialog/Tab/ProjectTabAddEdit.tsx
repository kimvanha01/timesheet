import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { IProjectForm } from 'src/features/Projects/redux/project.types';
import GeneralTab from '../Content/General/GeneralTab';
import TasksTab from '../Content/Tasks/TasksTab';
import TeamTab from '../Content/Team/TeamTab';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function projectProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
interface Props {
    projectEdit: IProjectForm | null,
    isEditMode?: boolean
}
export default function ProjectTabAddEdit({ projectEdit, isEditMode }: Props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="General" sx={{ fontSize: 16, textTransform: "none" }} {...projectProps(0)} />
                    <Tab label="Team" sx={{ fontSize: 16, textTransform: "none" }} {...projectProps(1)} />
                    <Tab label="Tasks" sx={{ fontSize: 16, textTransform: "none" }} {...projectProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <GeneralTab projectEdit={projectEdit} isEditMode={isEditMode} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TeamTab isEditMode={isEditMode} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TasksTab isEditMode={isEditMode} />
            </TabPanel>
        </Box>
    );
}