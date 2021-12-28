import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { IProject } from '../../redux/project.types';
import { ProjectItem } from "./TableChildren";

interface Props {
  projectListByCustomer: IProject[];

}
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "lightgray",
      paddingLeft: 10,
      borderRadius: 5,
    },
    tableContainer: {
      boxShadow: "none !important",
      padding: "0 20px",
    },
  }),
);
const TableProject = ({ projectListByCustomer }: Props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer} sx={{ paddingBottom: 20 }}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} component="th" scope="row" sx={{ fontSize: 16 }} className={classes.root}>{projectListByCustomer[0].customerName}
            </TableCell>
          </TableRow>
          {projectListByCustomer.map((project, index) => (
            <ProjectItem
              project={project}
              key={index}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableProject;

