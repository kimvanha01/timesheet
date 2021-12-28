import React from 'react';
import { useSelector } from 'react-redux';
import { ETabType, IProjectState, ITimeSheetStatisticTask } from 'src/features/Projects/redux/project.types';
import TableContent from '../TableContent';

interface Props {
    type: ETabType;
}

const TabChildren = ({ type }: Props) => {
    const list = useSelector((state: IProjectState) =>
        type === ETabType.Tasks
            ? state.projects.timeSheetStatisticTasks
            : state.projects.timeSheetStatisticTeams
    );
    if (type === ETabType.Tasks) {
        const billableList = list?.filter(
            (task: ITimeSheetStatisticTask) => task.billable
        );
        const nonBillableList = list?.filter(
            (task: ITimeSheetStatisticTask) => !task.billable
        );
        return (
            <>
                <TableContent taskList={billableList} />
                {nonBillableList.length > 0 ? (
                    <TableContent taskList={nonBillableList} />
                ) : (
                    null
                )}
            </>
        );
    } else return <><TableContent teamList={list} /></>
};

export default TabChildren;