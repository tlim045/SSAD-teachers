import React, {useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ChartistGraph from "react-chartist";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardFooter from "components/Card/CardFooter.js";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Identicon from 'identicon.js';
import axios from 'axios';
import {
    dailySalesChart,
    emailsSubscriptionChart
  } from "./../variables/charts";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

axios.defaults.baseURL = "https://ssadteachers.herokuapp.com/";

const columns = [
    { id: 'question', label: 'Question', minWidth: 150, align: 'left' },
    { id: 'attempt', label: 'Attempts', minWidth: 100, align: 'right' },
    { id: 'score', label: 'Score', minWidth: 100, align: 'right' }
  ];
  
  function createData(question, attempt, score) {
    return { question, attempt, score };
  }
  
  const rows = [
    createData('Which one of the following is not an Evolutionary Process Model?', 1, 16),
    createData("The Incremental Model is a result of combination of elements of which two models?", 2, 16),
    createData("What is the major advantage of using Incremental Model?", 0, 0),
    createData("The spiral model was originally proposed by", 0, 0),
    createData("The spiral model has two dimensions namely _____________ and ____________", 5, 16),
    createData("How is WINWIN Spiral Model different from Spiral Model?", 3, 16),
    createData("Identify the disadvantage of Spiral Model.", 1, 14)
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
    },
    typo: {
        marginLeft: 14
    },
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

function ConvertStringToHex(str) {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
           arr[i] = (str.charCodeAt(i).toString(16)).slice(-4);
    }
    return arr.join("");
}

export default function ViewStudents(){
    const classes = useStyles();
    const href = window.location.href;
    const studentName = href.substring(href.lastIndexOf('/') + 1);

    const [studentInfo, setStudentInfo] = React.useState({
        username: "",
        fullname: "",
        labGroup: "",
        email: "",
        hexString: ""
    })

    useEffect(() => {
        axios.get('/getStudentAccounts').then((allStudents) => {
            const students = allStudents.data.filter(student => student.Username === studentName);
            const data = students[0];
            const student = {
                username: data.Username,
                fullname: data.FirstName + " " + data.LastName,
                labGroup: data.LabGroup,
                email: data.Email,
                hexString: ConvertStringToHex(data.Username + data.Email + 
                                                data.FirstName + " " + data.LastName)
            }
            setStudentInfo({ ...student });
        });
    });

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

    // create a base64 encoded PNG
    var data = studentInfo.hexString.length >15 && new Identicon(studentInfo.hexString, 420).toString();

    return <div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
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
            <GridItem xs={12} sm={12} md={4}>
                <Card profile>
                    <CardAvatar profile>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src={`data:image/png;base64,${data}`}/>
                        </a>
                    </CardAvatar>
                    <CardBody profile>
                        <h4 className={classes.cardTitle}>@{studentName}</h4>
                        <p>
                            {studentInfo.fullname} <br/>
                            Lab group {studentInfo.labGroup} <br/>
                            {studentInfo.email}
                        </p>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">Galaxy</InputLabel>
                    <Select
                    native
                    value={state.galaxy}
                    onChange={handleChange}
                    inputProps={{
                        name: 'galaxy',
                        id: 'filled-age-native-simple',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"Milky Way"}>Milky Way</option>
                    </Select>
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">Planet</InputLabel>
                    <Select
                    native
                    value={state.planet}
                    onChange={handleChange}
                    inputProps={{
                        name: 'planet',
                        id: 'filled-age-native-simple',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value={"Mercury"}>Mercury</option>
                    <option value={"Venus"}>Venus</option>
                    <option value={"Earth"}>Earth</option>
                    <option value={"Mars"}>Mars</option>
                    <option value={"Jupiter"}>Jupiter</option>
                    <option value={"Saturn"}>Saturn</option>
                    <option value={"Uranus"}>Uranus</option>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Button className={classes.exportBtn} variant="contained">Export</Button>
            </GridItem>
        </GridContainer>
        <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
            <Card chart>
                <CardHeader color="warning">
                <ChartistGraph
                    className="ct-chart"
                    data={emailsSubscriptionChart.data}
                    type="Bar"
                    options={emailsSubscriptionChart.options}
                    responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                    listener={emailsSubscriptionChart.animation}
                />
                </CardHeader>
                <CardBody>
                <h4 className={classes.cardTitle}>Level</h4>
                <p className={classes.cardCategory}>Student's Performance</p>
                </CardBody>
                <CardFooter chart>
                <div className={classes.stats}>
                    <AccessTime /> updated 2 days ago
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align} className={classes.cell}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
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