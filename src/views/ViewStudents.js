import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardFooter from "components/Card/CardFooter.js";
import AccessTime from "@material-ui/icons/AccessTime";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Identicon from 'identicon.js';
import PublicIcon from '@material-ui/icons/Public';
import Update from "@material-ui/icons/Update";
import Divider from '@material-ui/core/Divider';
import Grade from "@material-ui/icons/Grade";
import CardIcon from "components/Card/CardIcon.js";
import LanguageIcon from '@material-ui/icons/Language';
import SpeedIcon from '@material-ui/icons/Speed';
import CustomBarChart from 'components/Chart/CustomBarChart';
import CustomPieChart from "components/Chart/CustomPieChart";
import CustomLineChart from "components/Chart/CustomLineChart";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import { dictOfPlanet, dictOfGalaxy } from './../variables/general';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import image404 from "./../assets/img/404-page-templates.png";

axios.defaults.baseURL = "https://ssadteachers.herokuapp.com/";
// axios.defaults.baseURL = "http://localhost:3000/";

const columns = [
    { id: 'planet', label: 'Planet', minWidth: 100 },
    { id: 'question', label: 'Question', minWidth: 100 },
    { id: 'difficulty', label: 'Level', minWidth: 100},
    { id: 'attempt', label: 'Attempts', minWidth: 100},
    { id: 'passFail', label: 'Pass/Fail', minWidth: 100}
];

function createData(planet, question, difficulty, attempt, passFail) {
    return { planet: dictOfPlanet[planet-1], question, difficulty, attempt, passFail };
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
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
        hexString: "",
        planet: 0,
        galaxy: 0,
        score: 0,
    })

    const [galaxy, setGalaxy] = React.useState(1);
    
    const handleChange = (event) => {
        setGalaxy(event.target.value);
    };

    const listOfGalaxyLabel = [ "Galaxy 1", "Galaxy 2", "Galaxy 3", "Galaxy 4"];

    const [lineChartStat, setLineChartStat] = React.useState({});

    const [barChartStat, setBarChartStat] = React.useState({
        lable: listOfGalaxyLabel,
        data: [[12, 17, 7, 17]]
    });

    const [pieChartStat, setPieChartStat] = React.useState([]);

    const [appState, setAppState] = useState({
        loading: false,
        allQuestions: null,
    });

    const [updated, setUpdate] = useState(true);

    useEffect(() => {
        axios.get(`/getStudentDetails/${studentName}`).then(data => {
            if(data.data.information !== undefined){
                const studentInfo = data.data.information;
                const score = data.data.score !== null ? data.data.score.Score : 0;
                const planet = data.data.planet !== undefined ? data.data.planet.UnlockedPlanet : 1;
                const temp = {
                    username: studentInfo !== undefined ? studentInfo.Username : "",
                    fullname: studentInfo !== undefined ? studentInfo.FirstName + " " + studentInfo.LastName : "",
                    labGroup: studentInfo !== undefined ? studentInfo.LabGroup: "",
                    email: studentInfo !== undefined ? studentInfo.Email : "",
                    hexString: studentInfo !== undefined ? ConvertStringToHex(studentInfo.Username + studentInfo.Email + 
                        studentInfo.FirstName + " " + studentInfo.LastName) : "",
                    score: score,
                    planet: planet,
                    galaxy: Math.floor((planet-1)/8)+1
                }
                setStudentInfo({ ...temp });
            } else setStudentInfo(undefined);
        })

        axios.get(`/getStudentSummary/${studentName}`).then(data => {
            const allData = data.data;
            setAppState({ loading: false, allQuestions: allData });
        })

        var dictionary, dataTemp, i, planetNumber;

        axios.get(`/getNumberOfAttempsForOneCorrectAnsForOneStudentForEachGalaxy/${studentName}`).then(data => {
            dictionary = data.data;
            dataTemp = [[]];
            for (i=0; i<4; i++){
                dataTemp[0].push(dictionary[i]);
            }
            setBarChartStat({ data: dataTemp, label: listOfGalaxyLabel });
        })

        axios.get(`/getNumberOfAttemptsByLevelForStudent/${studentName}`).then(data => {
            dictionary = data.data;
            dataTemp = [];
            if(dictionary.Easy > 0) dataTemp.push({ title: 'Easy', value: dictionary.Easy, color: '#4caf50'});
            if(dictionary.Medium > 0) dataTemp.push({ title: 'Medium', value: dictionary.Medium, color: '#00acc1'});
            if(dictionary.Difficult > 0) dataTemp.push({ title: 'Difficult', value: dictionary.Difficult, color: '#ff9800'});
            setPieChartStat(dataTemp);
        })

        axios.get(`/getNumberOfCorrectAnswerOverQuestionForOneStudentForEachPlanet/${studentName}`).then(data => {
            setLineChartStat(data.data);
            console.log(data.data);
        })


        setUpdate(false);
    }, [updated]);

    const rows = [];
    appState.allQuestions && 
    appState.allQuestions.forEach(question => 
        rows.push(createData(question.Planet, question.Question, question.Difficulty, question.NumberOfAttempts, question.AnsweredCorrectly ? "Pass" : "Fail")));

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // create a base64 encoded PNG
    var data = studentInfo !== undefined && studentInfo.hexString.length >15 && new Identicon(studentInfo.hexString, 420).toString();

    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [deleteSuccessful, setDeleteSuccessful] = React.useState(false);

    const handleOpenDelete = () => setDeleteOpen(true);

    const handleCloseDelete = () => setDeleteOpen(false);

    const handleDeleteAccount = () => {
        console.log(studentName);
        axios.post(`/DeleteAccount/${studentName}`).then(setDeleteSuccessful(true));
    }

    const handleCloseDeleteSuccessful = () => {
        setDeleteSuccessful(false);
        handleCloseDelete();
        setUpdate(true);
    }

    return studentInfo === undefined ? 
    <div>
        Account not found. Please go back to homepage
        <img width='100%' src={image404}/>
    </div> 
    : <div>
        <GridContainer>
            <GridItem xs={12} sm={6} md={12}>
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
                        {/* <Button style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)", color: "white" }} onClick={handleOpenDelete}> */}
                        <Button round color="primary" onClick={handleOpenDelete}>    
                            Delete
                        </Button>
                    </CardBody>
                </Card>
            </GridItem>
            {/* <GridItem xs={12} sm={6} md={4}/> */}
             
        </GridContainer>

        <Dialog open={deleteOpen} onClose={handleOpenDelete} aria-labelledby="form-dialog-title" maxWidth='xl'>
            <DialogTitle id="form-dialog-title" color='primary'>Are you sure delete account <a>{studentName}</a></DialogTitle>
            <DialogActions>
                <Button onClick={handleCloseDelete} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDeleteAccount} color="primary">
                    Delete this account
                </Button>
            </DialogActions>
        </Dialog>

        <Snackbar open={deleteSuccessful} autoHideDuration={6000} onClose={handleCloseDeleteSuccessful}>
            <Alert onClose={handleCloseDeleteSuccessful} severity="success">
                Account is deleted
            </Alert>
        </Snackbar>

        <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
            <Card>
                <CardHeader color="warning" stats icon>
                <CardIcon color="info">
                    <Grade />
                </CardIcon>
                <p className={classes.cardCategory}>Score</p>
                <h3 className={classes.cardTitle} style={{ color: '#3C4858'}}>
                    {studentInfo.score}
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
            <GridItem xs={12} sm={6} md={4}>
            <Card>
                <CardHeader color="success" stats icon>
                <CardIcon color="info">
                    <PublicIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Current galaxy</p>
                <h3 className={classes.cardTitle} style={{ color: '#3C4858'}}>{`Galaxy ${studentInfo.galaxy}`}</h3>
                <span style={{ color: '#3C4858'}}>{dictOfGalaxy[studentInfo.galaxy-1]}</span>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                    <Update />
                        Just Updated
                    </div>
                </CardFooter>
            </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
            <Card>
                <CardHeader color="info" stats icon>
                <CardIcon color="info">
                    <LanguageIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Current planet</p>
                <h3 className={classes.cardTitle} style={{ color: '#3C4858'}}>{`Planet ${studentInfo.planet}`}</h3>
                <span style={{ color: '#3C4858'}}>{dictOfPlanet[studentInfo.planet-1]}</span>
                <span>yeah</span>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                    <Update />
                        Last 1 day
                    </div>
                </CardFooter>
            </Card>
            </GridItem>
        </GridContainer>

        <Divider style={{ marginBottom: 40 }} variant="middle" />

        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="warning">
                    <CustomBarChart stat={barChartStat}/>
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>How this student master each galaxy</h4>
                        <p className={classes.cardCategory}>Calculated by his number of attemps for 1 correct answer in each galaxy</p>
                        <FormControl style={{visibility: 'hidden'}} className={classes.formControl}>
                            <Select />
                        </FormControl>
                    </CardBody>
                    <CardFooter chart>
                    <div className={classes.stats}>
                        <AccessTime /> updated 4 minutes ago
                    </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="success">
                        <CustomLineChart specialStat={lineChartStat} galaxy={galaxy}/>
                    </CardHeader>
                    <CardBody>
                        {/* <h4 className={classes.cardTitle}></h4> */}
                        <h4 className={classes.cardTitle}>How this student master each planet in</h4>
                        <p className={classes.cardCategory}>Calculated by number of correct answers over total questions in each planet</p>
                        <FormControl className={classes.formControl}>
                            <Select
                            native
                            value={galaxy}
                            onChange={handleChange}
                            inputProps={{
                                name: 'galaxy',
                                id: 'age-native-simple',
                            }}
                            >
                            <option value={1}>Galaxy 1</option>
                            <option value={2}>Galaxy 2</option>
                            <option value={3}>Galaxy 3</option>
                            <option value={4}>Galaxy 4</option>
                            </Select>
                        </FormControl>
                    </CardBody>
                    <CardFooter chart>
                    <div className={classes.stats}>
                        <AccessTime /> updated 4 minutes ago
                    </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="danger">
                        <CustomPieChart stat = {pieChartStat}/>
                    </CardHeader>
                    <CardBody>
                    <h4 className={classes.cardTitle}>How students master each level</h4>
                        <p className={classes.cardCategory}>Calculated by number of attemps for 1 correct in each level</p>
                        <FormControl style={{visibility: 'hidden'}} className={classes.formControl}>
                            <Select />
                        </FormControl>
                    </CardBody>
                    <CardFooter chart>
                    <div className={classes.stats}>
                        <AccessTime /> updated 5 minutes ago
                    </div>
                    </CardFooter>
                </Card>
            </GridItem>
            
        </GridContainer>

        <Divider style={{ marginBottom: 40 }} variant="middle" />

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