import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableItem } from './TableItem';
import { ITimeSheetStatisticTask, ITimeSheetStatisticTeam } from 'src/features/Projects/redux/project.types';

interface Props {
    taskList?: ITimeSheetStatisticTask[];
    teamList?: ITimeSheetStatisticTeam[];
}
function TableContent({ taskList, teamList }: Props) {
    const isBillable = taskList ? taskList[0]?.billable : true;
    let totalWorkingTime = 0;
    let totalBillableWorkingTime = 0;
    const list = taskList ? taskList : teamList;
    list?.forEach((item: ITimeSheetStatisticTask | ITimeSheetStatisticTeam) => {
        totalWorkingTime += item.totalWorkingTime;
        totalBillableWorkingTime += item.billableWorkingTime;
    });
    const calcProgress = (workingTime: number, billableWorkingTime: number) => {
        if (!billableWorkingTime || !workingTime) return 0;
        else return (billableWorkingTime / workingTime) * 100;
    };
    const showList = taskList
        ? taskList.map((task) => (
            <TableRow key={task.taskId}>
                <TableCell>{task.taskName}</TableCell>
                <TableItem
                    isBillable={isBillable}
                    totalWorkingTime={task.totalWorkingTime}
                    progress={calcProgress(
                        task.billableWorkingTime,
                        task.billableWorkingTime
                    )}
                />
            </TableRow>
        ))
        : teamList?.map((user) => (
            <TableRow key={user.userID}>
                <TableCell>{user.userName}</TableCell>
                <TableItem
                    isBillable={isBillable}
                    totalWorkingTime={user.totalWorkingTime}
                    progress={calcProgress(
                        user.billableWorkingTime,
                        user.billableWorkingTime
                    )}
                />
            </TableRow>
        ));

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {teamList
                                ? "Name"
                                : isBillable
                                    ? "Billable Tasks"
                                    : "Non-billable Tasks"}
                        </TableCell>
                        <TableCell>HOURS</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{isBillable ? "Billable Hours" : ""}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableItem
                            isBillable={isBillable}
                            totalWorkingTime={totalWorkingTime}
                            progress={calcProgress(
                                totalBillableWorkingTime,
                                totalWorkingTime
                            )}
                        />
                    </TableRow>
                    {showList}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableContent;
