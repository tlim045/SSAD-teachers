import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ChartistGraph from "react-chartist";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {
    dailySalesChart,
    emailsSubscriptionChart
  } from "./../variables/charts";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// table
const columns = [
    { id: 'name', label: 'Name', minWidth: 170, type: 'link' },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'lab', label: 'Lab Group', minWidth: 100 },
    { id: 'level', label: 'Current level', minWidth: 100 },
    { id: 'score', label: 'Total Score', minWidth: 100 },
    
  ];
  
  function createData(name, email, lab, level, score) {
    //calculate score here?
    return { name, email, lab, level, score };
  }
  
  const rows = [
    createData('Michael Scott', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934),
    createData('Student 1', 'student1@e.ntu.edu.sg', 'BCG3', 'Galaxy 1 Planet 5', 934)
  
  ];
  

const useStyles = makeStyles((theme) => ({
    ...styles,
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      '& .MuiFilledInput-root': {
        color: "#174A84",
        borderColor: "#A5C9FF",
        backgroundColor: "white",
      },
      '& .MuiFormLabel-root': {
        color: "#174A84"
      }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    exportBtn: {
        marginTop: 20,
        marginBottom: 20,
        width: 140,
        backgroundColor: "#174A84",
        color: 'white' 
    },
    cell: {
        color: "#3C4858"
    },
    paperWrapper: {
        marginTop: '1em',
        width: '100%'
    },
    container: {
        maxHeight: 440,
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#174A84",
      color: "white",
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);

export default function ViewLabs(){
    const classes = useStyles();
    const [state, setState] = React.useState({
        galaxy: '',
        planet: '',
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return <div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card chart>
                    <CardHeader color="success">
                    <ChartistGraph
                        className="ct-chart"
                        data={dailySalesChart.data}
                        type="Line"
                        options={dailySalesChart.options}
                        listener={dailySalesChart.animation}
                    />
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>Activity</h4>
                    <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                        </span>{" "}
                        increase in today activities.
                    </p>
                    </CardBody>
                    <CardFooter chart>
                    <div className={classes.stats}>
                        <AccessTime /> updated 4 minutes ago
                    </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
        
        <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
            </GridItem>
        </GridContainer>
        <Paper className={classes.paperWrapper}>
            <TableContainer className={classes.container}>
            <Table stickyHeader>
                <TableHead>
                <TableRow>
                    {columns.map((column) => (
                    <StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                    >
                        {column.label}
                    </StyledTableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align} className={classes.cell}>
                            {column.type === 'link' ? <a href={`/admin/student/${value.replace(' ', '-')}`}>{value}</a>: value}
                            </TableCell>
                        );
                        })}
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    </div>
}