import { LinearProgress, TableCell } from "@mui/material";
interface Props {
    isBillable: boolean | undefined;
    totalWorkingTime: number
    progress: number
}

export const TableItem = (props: Props) => {
    const { isBillable, totalWorkingTime, progress } = props;
    return (
        <>
            <TableCell>
                {totalWorkingTime / 60 > 0 ? totalWorkingTime / 60 : null}
            </TableCell>
            <TableCell></TableCell>
            {isBillable ? (
                <>
                    <TableCell>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                        />
                    </TableCell>
                    <TableCell>{`(${progress}%)`}</TableCell>
                </>
            ) : (
                <>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </>
            )}
        </>
    );
};
