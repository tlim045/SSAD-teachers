import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grade from "@material-ui/icons/Grade";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Update from "@material-ui/icons/Update";
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
axios.defaults.baseURL = "https://ssadteachers.herokuapp.com/";
// axios.defaults.baseURL = "http://localhost:3000/";

// table
const columns = [
    { id: 'Username', label: 'Name', minWidth: 170, type: 'link' },
    { id: 'Score', label: 'Total Score', minWidth: 100 }
  ];
  
  function createData(name, score) {
    return { name, score };
  }
  
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
    const [students, setStudents] = React.useState([]);
    const [totalScore, setTotalScore] = React.useState(0);
    const href = window.location.href;
    const labName = href.substring(href.lastIndexOf('/') + 1);

    axios.get('/getAllStudents').then((allStudents) => {
        const rows = [];
        const allData = allStudents.data.StudentList.sort((a, b) => parseFloat(b.Score) - parseFloat(a.Score)).filter(item => item.LabGroup === labName);
        
        var tempScore = 0;
        allData.forEach(student => tempScore+=student.Score);
        setTotalScore(tempScore);

        for ( var i = 0; i < allData.length; i++ ){
            const data = allData[i];
            rows.push(createData(data.Username, data.Score, data.LabGroup));
        }
        setStudents(allData);
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return <div>
        <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                    <CardIcon color="info">
                        <Grade />
                    </CardIcon>
                    <p className={classes.cardCategory}>Total Score</p>
                    <h3 className={classes.cardTitle} style={{ color: '#3C4858'}}>
                        {totalScore}
                    </h3>
                    <span>yeah</span>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                        <Update />
                            Updated 2 hours ago
                        </div>
                    </CardFooter>
                </Card>
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
                {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align} className={classes.cell}>
                            {column.type === 'link' ? <a href={`/admin/student/${value}`}>{value}</a>: value}
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
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    </div>
}