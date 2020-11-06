import React, { useEffect, useState } from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AccessTime from "@material-ui/icons/AccessTime";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CustomBarChart from 'components/Chart/CustomBarChart';
import CustomPieChart from "components/Chart/CustomPieChart";
import CustomLineChart from "components/Chart/CustomLineChart";
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Report from './../components/Print/Report';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import { dictOfPlanet } from './../variables/general';

// axios.defaults.baseURL = "https://ssadteachers.herokuapp.com/";
axios.defaults.baseURL = "http://localhost:3000/";

const useStyles = makeStyles(styles);

const columns = [
    { id: 'planet', label: 'Planet', minWidth: 100 },
    { id: 'question', label: 'Question', minWidth: 100 },
    { id: 'difficulty', label: 'Level', minWidth: 100}
];

function createData(planet, question, difficulty) {
    return { planet: dictOfPlanet[planet-1], question, difficulty };
}

export default function ViewGalaxy() {
    const pieChartStat = [
        { title: 'Easy', value: 200, color: '#4caf50'},
        { title: 'Medium', value: 100, color: '#00acc1'},
        { title: 'Difficult', value: 60, color: '#ff9800'},
    ]

    const lineChartStat = {
        label: ["Planet 1", "Planet 2", "Planet 3", "Planet 4", "Planet 5", "Planet 6", "Planet 7", "Planet 8"],
        data: [[12, 17, 7, 17, 23, 18, 38, 10]]
    }

    const barChartStat = {
        label: [
            "Planet 1",
            "Planet 2",
            "Planet 3",
            "Planet 4",
            "Planet 5",
            "Planet 6",
            "Planet 7",
            "Planet 8"
          ],
        data: [[542, 443, 320, 780, 553, 453, 326, 434]]
    }
    const classes = useStyles();
    const href = window.location.href;
    var galaxyName = href.substring(href.lastIndexOf('/') + 1);
    galaxyName = galaxyName.replace(/%20/g, " ");

    const [appState, setAppState] = useState({
        loading: false,
        allQuestions: null,
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

    useEffect(() => {
        setAppState({ loading: true });
        axios.get('/allQuestions').then((allQuestions) => {
            const allData = allQuestions.data.questions;
            setAppState({ loading: false, allQuestions: allData });
        });
    }, [setAppState]);

    const rows = [];
    appState.allQuestions && appState.allQuestions.forEach(question => rows.push(createData(question.Planet, question.Question, question.Difficulty)));

    const [VideoOpen, setVideoOpen] = React.useState(false);
    const [VideoURL, setVideoURL] = React.useState("");

    const handleChangeVideLink = (event) => {
        setVideoURL(event.target.value);
    }

    const handleVideoOk = () => {
        setVideoOpen(false);
        console.log(VideoURL);
      };
    
    const handleVideoCancel = () => {
        setVideoOpen(false);
    };

    const handleOpenVideo = () => {
        setVideoOpen(true);
    }

    const [reportOpen, setReportOpen] = useState(false);

    const viewReport = () => setReportOpen(true);

    const closeReport = () => setReportOpen(false);

    const barChart = 
        <Card chart>
            <CardHeader color="warning">
                <CustomBarChart stat={barChartStat}/>
            </CardHeader>
            <CardBody>
                {/* <h4 className={classes.cardTitle}>Planet 4 is mastered by most students</h4> */}
                <p className={classes.cardCategory}>How students master each planet</p>
            </CardBody>
            <CardFooter chart>
            <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
            </div>
            </CardFooter>
        </Card>
    
    const lineChart = 
    <Card chart>
        <CardHeader color="success">
            <CustomLineChart stat={lineChartStat}/>
        </CardHeader>
        <CardBody>
            {/* <h4 className={classes.cardTitle}></h4> */}
            <p className={classes.cardCategory}>Number of correct answers/attempt on average</p>
        </CardBody>
        <CardFooter chart>
        <div className={classes.stats}>
            <AccessTime /> updated 4 minutes ago
        </div>
        </CardFooter>
    </Card>

    const pieChart = 
    <Card chart>
        <CardHeader color="danger">
            <CustomPieChart stat = {pieChartStat}/>
        </CardHeader>
        <CardBody>
            <p className={classes.cardCategory}>How students master each level</p>
        </CardBody>
        <CardFooter chart>
        <div className={classes.stats}>
            <AccessTime /> updated 5 minutes ago
        </div>
        </CardFooter>
    </Card>

    const questionTableToPrint =  //No split of rows  //TODO: Change back to not slice
            <TableBody>
            {rows.slice(1, 10).map((row, index) => {
                const realIndex = index + page * rowsPerPage;
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
                </TableRow>)})}
            </TableBody>

    const questionTableToShow = //split of rows
    <TableBody>
    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
        const realIndex = index + page * rowsPerPage;
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
        </TableRow>)})}
    </TableBody>

    const questionTable = (print) => {
        const table = print? questionTableToPrint : questionTableToShow;
        return<Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>All Questions</h4>
                <p className={classes.cardCategoryWhite}>
                All questions in this galaxy
                </p>
            </CardHeader>
            <CardBody>
            <Paper className={classes.paperWrapper}>
                <TableContainer className={classes.container}>
                <Table>
                    <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                        {table}
                    </Table>
                </TableContainer>
                {!print && <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />}
            </Paper>
            </CardBody>
            </Card>
    }

    return (
        <div>
            <Typography variant="button">{galaxyName}</Typography>
            <Tooltip
                id="tooltip-top"
                title="Export report PDF"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
                >
                <Button
                    style={{ marginLeft: '70em', backgroundColor: '#9c27b0', color: 'white', marginBottom: 20 }}
                    color={window.innerWidth > 959 ? "transparent" : "white"}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    // aria-owns={openNotification ? "notification-menu-list-grow" : null}
                    aria-haspopup="true"
                    className={classes.buttonLink}
                    variant="contained"
                    onClick={() => viewReport()}
                >
                    <GetAppIcon className={classes.icons} />
                    </Button>
                </Tooltip>
            <GridContainer>
                <GridItem xs={12} sm={20} md={4}>
                    {barChart}
                </GridItem>
                <GridItem xs={12} sm={20} md={4}>
                    {lineChart}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    {pieChart}
                </GridItem>
            </GridContainer>
                
            <Divider style={{ margin: 20 }} variant="middle" />

            <Typography variant="button">All Questions</Typography>
            {questionTable(false)}

            <Divider style={{ margin: 20 }} variant="middle" />

            <GridContainer spacing={3}>
                <GridItem xs={6} sm={6} md={2}>
                    <Tooltip
                        id="tooltip-top"
                        title="Edit Video URL"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                        >
                            <Button style={{ marginBottom: 10 }} onClick={handleOpenVideo}>Tutorial Video</Button>
                    </Tooltip>
                </GridItem>
            </GridContainer>
            
            <iframe style={{ marginBottom: 20 }} width="1100" height="315" src="https://www.youtube.com/embed/sB2iQSvrcG0" frameborder="0" allowfullscreen></iframe>
            <Dialog open={VideoOpen} onClose={handleVideoCancel} aria-labelledby="form-dialog-title" maxWidth='xl'>
                <DialogTitle id="form-dialog-title" color='primary'>Update tutorial url</DialogTitle>
                <DialogContent>
                    <Typography>Copy and paste the link of the tutorial. Please replace {<b>/watch?v=</b>} with {<b>/embed/</b>}</Typography>
                    <TextField name = "video" label="Video URL" required="true" style = {{width: '100%'}} onChange={handleChangeVideLink}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleVideoCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleVideoOk} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <Report lineChart={lineChart} pieChart={pieChart} barChart={barChart} 
                    table={questionTable(true)} openReport={reportOpen}
                    closeReport={() => closeReport()}/>
        </div>
    )
}
