import React, {useState,Fragment, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { PieChart } from 'react-minimal-pie-chart';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
// Table
import Table from "@material-ui/core/Table";
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomPieChart from "components/Chart/CustomPieChart";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.baseURL = "https://ssadteachers.herokuapp.com/";

const useStyles = makeStyles({
  styles,
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
});

// table
const columns = [
  { id: 'rank', label: 'Rank', minWidth: 100},
  { id: 'name', label: 'Name', minWidth: 170, type: 'link' },
  { id: 'score', label: 'Total Score', minWidth: 100 },
  { id: 'labGroup', label: 'Lab Group', minWidth: 100}
  
];

function createData(name, score, labGroup) {
  //calculate score here?

  return { name, score, labGroup };
  // return { name, email, lab, score };
}

export default function Dashboard() {

  const [rows, setData] = useState([]);
  const [] = useState();

  const propsData = [
    //TODO: Hardcoded values for now, extract from DB
    { title: 'Planning and Defining', value: 80, color: '#ff9800'},
    { title: 'Design', value: 25, color: '#f44336'},
    { title: 'Implementation', value: 40, color: '#4caf50'},
    { title: 'Testing and Maintainance', value: 60, color: '#00acc1'},
  ]

  useEffect(() => {
    axios.get('/getAllStudents').then((allStudents) => {
      const allData = allStudents.data.StudentList.sort((a, b) => parseFloat(b.Score) - parseFloat(a.Score));
      for ( var i = 0; i < allData.length; i++ ){
        const data = allData[i];
        rows.push(createData(data.Username, data.Score, data.LabGroup));
      }
      setData(rows);
    });
  }, [setData]);

  //console.log(data);
  const [allLabs, setData2] = useState([]);

  useEffect(() => {
    const labs = [];
    axios.get('/getAllLabGroups').then((allLabs) => {
      for ( var i = 0; i < allLabs.data.LabGroupList.length; i++ ){
       labs.push(allLabs.data.LabGroupList[i]);}
      setData2(labs);
    });
  }, [setData2]);

  const renderRow = (props) => {
    const { index, style } = props;
    return (
      allLabs.length !== 0 &&
      <ListItem button style={style} component={Link} to={`/admin/lab/${allLabs[index]}`}>
        <ListItemText primary={allLabs[index]} />
      </ListItem>
    );
  }

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <GridContainer>
      <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>All Students</h4>
            <p className={classes.cardCategoryWhite}>
              All students taking module CZ3003 
            </p>
          </CardHeader>
          <CardBody>

      <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
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
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = column.id !== 'rank' ? row[column.id] : `Rank ${index + page * rowsPerPage + 1}`;
                    return (
                      <TableCell key={column.id} align={column.align}>
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </CardBody>
    </Card>
      </GridContainer>

      
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>View Lab Groups</h4>
            </CardHeader>
            <CardBody>
            <div className={classes.root}>
              <FixedSizeList height={455} width={430} itemSize={50} itemCount={20}>
                {renderRow}
              </FixedSizeList>
            </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Galaxy Gameplay</h4>
            </CardHeader>
            <CardBody>
            {/* <PieChart

            radius={PieChart.defaultProps.radius - shiftSize}
              viewBoxSize={[100,100]}
              data={[
                //TODO: Hardcoded values for now, extract from DB
                { title: 'Planning and Defining', value: 80, color: '#ff9800'},
                { title: 'Design', value: 25, color: '#f44336'},
                { title: 'Implementation', value: 40, color: '#4caf50'},
                { title: 'Testing and Maintainance', value: 60, color: '#00acc1'},
              ]}
              // label={({ dataEntry }) => (<a href={`/galaxy/${dataEntry.title}`}>{dataEntry.title}</a>)}
              segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
              label={({ dataEntry }) => dataEntry.title }
              labelStyle={{
                fontSize: '3px',
                labelPosition: 30
              }}
            />; */}
            <CustomPieChart stat={propsData} main={true}/>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}