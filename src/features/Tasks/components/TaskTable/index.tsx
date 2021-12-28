import {
    Button, Paper, Table, TableBody,
    TableCell, TableContainer, TableRow,
    Typography
} from '@mui/material';
import { createStyles, withStyles } from "@mui/styles";
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmDialog from 'src/components/ConfirmDialog';
import { ITask } from '../../redux/taskType';
import { archiveTask, deArchiveTask, deleteTask } from '../../redux/thunk';
import FormDialog from '../TaskDialog';
import { useStyles } from './TaskTableStyle';
import { styleButtonTable } from '../../../../components/CustomeStyleComponent/StyleButton';

interface Props {
    listTask: Array<ITask>,
    hasArchive: boolean
}
const StyledTableRow = withStyles(() =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: "#f9f9f9"
            },
            borderTop: "1px solid rgba(224, 224, 224, 1)",
        },
    }),
)(TableRow);

const TaskTable = ({ listTask, hasArchive }: Props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [currentTask, setCurrentTask] = useState<ITask | undefined>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isArchive, setIsArchive] = useState(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);

    const handleClickEdit = (task: ITask) => {
        setCurrentTask(task);
        setIsEditMode(true);
    };

    const handleClickDelete = (task: ITask) => {
        setCurrentTask(task);
        setIsConfirmDelete(true);
    }
    const handleConfirmDeleteTask = () => {
        dispatch(deleteTask(currentTask?.id));
        handleClickCloseDialog();
    }

    const handleClickArchive = (task: ITask) => {
        setCurrentTask(task);
        setIsArchive(true);
    }
    const handleConfirmArchive = () => {
        if (!currentTask?.isDeleted) {
            dispatch(archiveTask(currentTask?.id))
        } else {
            dispatch(deArchiveTask(currentTask?.id))
        }
        handleClickCloseDialog();
    }
    const handleClickCloseDialog = () => {
        setIsEditMode(false);
        setIsConfirmDelete(false);
        setIsArchive(false);
    };
    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Typography sx={{ m: 2 }} variant="h6" align='left'> {listTask.length > 0 ? 'Name' : ''}</Typography>
                <Table>
                    <TableBody>
                        {listTask.map((task: ITask) => (
                            <StyledTableRow key={task.id}>
                                <TableCell component="th" scope="row" className={classes.cellEdit} sx={{ p: 1 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="info"
                                        sx={styleButtonTable}
                                        onClick={() => handleClickEdit(task)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.name} sx={{ p: 1 }}>
                                    <Box fontSize={16}> {task.name}</Box>
                                </TableCell>
                                {hasArchive &&
                                    <TableCell component="th" scope="row" sx={{ padding: 0, textAlign: "right" }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={styleButtonTable}
                                            onClick={() => handleClickArchive(task)}
                                        >
                                            {!task.isDeleted ? 'Archive' : 'UnArchive'}
                                        </Button>
                                    </TableCell>}
                                <TableCell component="th" scope="row" sx={{ padding: 1, textAlign: "right", width: 95 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={styleButtonTable}
                                        onClick={() => handleClickDelete(task)}
                                        disabled={!task.isDeleted && hasArchive}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ConfirmDialog
                isOpen={isConfirmDelete}
                handleClickCloseDialog={handleClickCloseDialog}
                handleConfirm={handleConfirmDeleteTask}
                name={currentTask?.name}
                actionType="Delete"
            />
            <ConfirmDialog
                isOpen={isArchive}
                handleClickCloseDialog={handleClickCloseDialog}
                handleConfirm={handleConfirmArchive}
                name={currentTask?.name}
                actionType={!currentTask?.isDeleted ? 'Archive' : 'UnArchive'}
            />
            <FormDialog
                currentTask={currentTask}
                handleClickCloseDialog={handleClickCloseDialog}
                openDialog={isEditMode}
                title="Edit"
            />
        </>
    );
}

export default TaskTable;