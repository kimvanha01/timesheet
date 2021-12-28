import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { EFilterTime } from 'src/features/Projects/redux/project.types';

export interface DialogTitleProps {
    onBackTime: () => void;
    onNextTime: () => void;
    timeFilter: EFilterTime;
    startTime: moment.Moment | null;
    endTime: moment.Moment | null;
    customStartTime: () => void;
    customEndTime: () => void;
    handleChangeTimeFilter: (value: EFilterTime) => void;
    handleOpenDialog: () => void
}

const ProjectHeader = ({ onBackTime, onNextTime, timeFilter, startTime,
    endTime, customStartTime, customEndTime,
    handleChangeTimeFilter, handleOpenDialog }: DialogTitleProps) => {
    return (
        <>
            <Grid container sx={{ padding: " 12px 24px" }}>
                <Grid item xs={6} sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Box>
                        <Button sx={{ border: "1px solid #ccc", height: "45px", minWidth: "50px", borderRadius: "4px 0 0 4px" }}>
                            <ChevronLeft onClick={onBackTime} />
                        </Button>
                        <Button sx={{ border: "1px solid #ccc", height: "45px", minWidth: "50px", borderRadius: "0 4px 4px 0" }}>
                            <ChevronRight onClick={onNextTime} />
                        </Button>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "20px", marginLeft: 1, fontWeight: 600 }}>
                            {`${timeFilter}${startTime && endTime
                                ? `: ${customStartTime() + " - " + customEndTime()}`
                                : ""
                                }`}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={6} sx={{ marginRight: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <FormControl>
                        <Select
                            sx={{ textAlign: "left", width: "180px", mr: "10px" }}
                            size="small"
                            value={timeFilter}
                            onChange={(e) =>
                                handleChangeTimeFilter(e.target.value as EFilterTime)
                            }>
                            <MenuItem value={EFilterTime.Week}>Week</MenuItem>
                            <MenuItem value={EFilterTime.Month}>Month</MenuItem>
                            <MenuItem value={EFilterTime.Quarter}>Quarter</MenuItem>
                            <MenuItem value={EFilterTime.Year}>Year</MenuItem>
                            <MenuItem value={EFilterTime.All}>All Time</MenuItem>
                            <MenuItem value={EFilterTime.Custom} onClick={handleOpenDialog}>Custom Time</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: 36 }}
                    >
                        Export
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
export default ProjectHeader;
