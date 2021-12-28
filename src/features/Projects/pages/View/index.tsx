import { Divider, Grid, Paper, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { styleMainBox, styleMainPaper } from '../../../../components/CustomeStyleComponent/styleLayout';
import ProjectHeader from '../../components/ViewProject/Header';
import { CustomTimeDialog } from '../../components/ViewProject/Header/CustomTimeDialog';
import ProjectTab from '../../components/ViewProject/Tab/ProjectTab';
import { EFilterTime } from '../../redux/project.types';
import { getTimeSheetStatisticTasksThunk, getTimeSheetStatisticTeamsThunk } from '../../redux/projectThunk';
type IdParams = {
    id: string | undefined;
};
function ProjectViewPage() {
    let { id } = useParams<IdParams>();
    const dispatch = useDispatch();
    const [timeFilter, setTimeFilter] = useState<EFilterTime>(EFilterTime.Week);
    const now = moment().format("YYYY-MM-DD");
    const [startTime, setStartTime] = useState<moment.Moment | null>(
        moment(now).isoWeekday(1)
    );
    const [endTime, setEndTime] = useState<moment.Moment | null>(
        moment(now).isoWeekday(7)
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = () => {
        setStartTime(null);
        setEndTime(null);
        setIsOpen(true);
    };
    const handleCloseDialog = () => {
        setIsOpen(false);
    };

    const handleSave = (start: Date, end: Date) => {
        handleCloseDialog();
        setStartTime(moment(start));
        setEndTime(moment(end));
    };
    const customDate = (time: number) => (time > 9 ? time : "0" + time);
    const customStartTime = () => {
        if (startTime && endTime)
            return `${customDate(startTime.date())}${startTime.month() !== endTime.month() ||
                startTime.year() !== endTime.year()
                ? "-" + customDate(startTime.month() + 1)
                : ""
                }${startTime.year() !== endTime.year() ? "-" + startTime.year() : ""}`;
    };

    const customEndTime = () => {
        if (startTime && endTime)
            return `${customDate(endTime.date())}-${customDate(
                endTime.month() + 1
            )}-${endTime.year()}`;
    };

    const handleChangeTimeFilter = (value: EFilterTime) => {
        setTimeFilter(value);
        switch (value) {
            case EFilterTime.Week:
                setStartTime(moment(now).isoWeekday(1));
                setEndTime(moment(now).isoWeekday(7));
                break;
            case EFilterTime.Month:
                setStartTime(moment(now).startOf("month"));
                setEndTime(moment(now).endOf("month"));
                break;
            case EFilterTime.Quarter:
                setStartTime(moment(now).startOf("quarter"));
                setEndTime(moment(now).endOf("quarter"));
                break;
            case EFilterTime.Year:
                setStartTime(moment(now).startOf("year"));
                setEndTime(moment(now).endOf("year"));
                break;
            case EFilterTime.All:
                setStartTime(null);
                setEndTime(null);
                break;
            case EFilterTime.Custom:
                handleOpenDialog();
                break;
        }
    };

    const onBackTime = () => {
        switch (timeFilter) {
            case EFilterTime.Week:
                setEndTime(moment(endTime).subtract(7, "days"));
                setStartTime(moment(startTime).subtract(7, "days"));
                break;
            case EFilterTime.Month:
                setStartTime(moment(startTime).subtract(1, "months").startOf("month"));
                setEndTime(moment(endTime).subtract(1, "months").endOf("month"));
                break;
            case EFilterTime.Quarter:
                setStartTime(moment(startTime).subtract(1, "quarters").startOf("month"));
                setEndTime(moment(endTime).subtract(1, "quarters").endOf("month"));
                break;
            case EFilterTime.Year:
                setStartTime(moment(startTime).subtract(1, "years"));
                setEndTime(moment(endTime).subtract(1, "years"));
                break;
        }
    };

    const onNextTime = () => {
        switch (timeFilter) {
            case EFilterTime.Week:
                setEndTime(moment(endTime).add(7, "days"));
                setStartTime(moment(startTime).add(7, "days"));
                break;
            case EFilterTime.Month:
                setStartTime(moment(startTime).add(1, "months").startOf("month"));
                setEndTime(moment(endTime).add(1, "months").endOf("month"));
                break;
            case EFilterTime.Quarter:
                setStartTime(moment(startTime).add(1, "quarters").startOf("month"));
                setEndTime(moment(endTime).add(1, "quarters").endOf("month"));
                break;
            case EFilterTime.Year:
                setStartTime(moment(startTime).add(1, "years"));
                setEndTime(moment(endTime).add(1, "years"));
                break;
        }
    };

    useEffect(() => {
        if (startTime && endTime) {
            const project = {
                id,
                start: startTime.format("YYYY-MM-DD"),
                end: endTime.format("YYYY-MM-DD"),
            };
            dispatch(getTimeSheetStatisticTasksThunk(project));
            dispatch(getTimeSheetStatisticTeamsThunk(project));
        } else {
            const project = {
                id,
                start: "",
                end: "",
            };
            dispatch(getTimeSheetStatisticTasksThunk(project));
            dispatch(getTimeSheetStatisticTeamsThunk(project));
        }
    }, [dispatch, endTime, startTime, id]);
    return (
        <Box component="main" sx={styleMainBox}>
            <Toolbar />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={styleMainPaper}>
                        <ProjectHeader
                            onBackTime={onBackTime}
                            onNextTime={onNextTime}
                            startTime={startTime}
                            endTime={endTime}
                            customStartTime={customStartTime}
                            customEndTime={customEndTime}
                            timeFilter={timeFilter}
                            handleChangeTimeFilter={handleChangeTimeFilter}
                            handleOpenDialog={handleOpenDialog}
                        />
                        <Divider />
                        <ProjectTab />
                    </Paper>
                </Grid>
            </Grid>
            <CustomTimeDialog
                isOpen={isOpen}
                handleClose={handleCloseDialog}
                handleSave={handleSave}
            />
        </Box>
    );
}

export default ProjectViewPage;