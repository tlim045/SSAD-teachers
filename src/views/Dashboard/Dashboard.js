  import React from "react";
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
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles({
  styles,
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index} component={Link} to="/admin/lab/BCG3">
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};
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

export default function Dashboard() {
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
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
            <PieChart

              radius={50}
              viewBoxSize={[100,100]}
              data={[
                //TODO: Hardcoded values for now, extract from DB
                { title: 'Galaxy1', value: 80, color: '#ff9800',galaxy: 'student'},
                { title: 'Galaxy2', value: 60, color: '#f44336'},
                { title: 'Galaxy3', value: 40, color: '#4caf50'},
                { title: 'Galaxy4', value: 25, color: '#00acc1'},
              ]}
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={{
                fontSize: '3px',
                labelPosition: 30
              }}
            />;
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
/*
<GridContainer>
        <GridItem xs={12} sm={12} md={4}>
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
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
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
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
*/