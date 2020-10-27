import React from "react";
import { Link } from 'react-router-dom';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { TwitterShareButton, TwitterIcon } from "react-share";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// radio buttons
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Table
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000/";


const headCells = [
  { id: 'galaxy', numeric: false, disablePadding: true, label: 'Galaxy', minWidth: 100 },
  { id: 'planet', numeric: false, disablePadding: false, label: 'Planet', minWidth: 100 },
  { id: 'question', numeric: false, disablePadding: false, label: 'Question', minWidth: 100 }
];

const dictOfGalaxy = ["Planning and Definning"];
const dictOfPlanet = ["Decomposition Techniques", "Estimation tools", "Size and Cost Estimation of Software"];

function createData(galaxy, planet, question, difficulty, QuestionID) {
  return { galaxy: dictOfGalaxy[galaxy-1], planet: dictOfPlanet[planet-1], question, difficulty, QuestionID };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar>
    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
      Select 10 Questions
    </Typography>

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function SendAssignment() {
  // table
  const [appState, setAppState] = React.useState({
    loading: false,
    repos: null,
  });

  const [updated, setUpdate] = React.useState(true);

  React.useEffect(() => {
    setAppState({ loading: true });
    axios.get('/allQuestions').then((allQuestions) => {
      const allData = allQuestions.data.questions;
      setAppState({ loading: false, allQuestions: allData });
    });
    setUpdate(false);
  }, [setAppState, updated]);

  const rows = [];
  appState.allQuestions && appState.allQuestions.forEach(question => 
    rows.push(createData(question.Galaxy, question.Planet, question.Question, question.Difficulty, question.QuestionID)));

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);

  };

  const handleClick = (event, QuestionID) => {

    const selectedIndex = selected.indexOf(QuestionID);
    let newSelected = [];

    if (selectedIndex === -1) { 
      if (selected.length < 10) newSelected = newSelected.concat(selected, QuestionID);
      else newSelected = selected;
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (question) => selected.indexOf(question) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  // original 
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // TODO: trigger Reddit/Twiiter base on value
  }

  // text field
  const [TextValue, setTextValue] = React.useState('');
  const [Title, setTitle] = React.useState('');

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Create new assignment</h4>
            </CardHeader>
            <CardBody>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Typography variant="h7">
                Select social media platform:  
              </Typography>  
              </Grid>
              <FormControlLabel
                control = {
                <Radio
                color="primary"
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="Twitter"
                inputProps={{ 'aria-label': 'A' }}
              />
                }
                label="Twitter"
              />
              <FormControlLabel
                control = {
                <Radio
                color="primary"
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
                name="Reddit"
                inputProps={{ 'aria-label': 'B' }}
              />
                }
                label="Reddit"
              />
              <Grid item xs={12}>
                <TextField 
                  id="outlined-search" 
                  label="Title of Assignment" 
                  type="title" 
                  variant="outlined" 
                  fullWidth="true"
                  onChange={handleChangeTitle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Text (Optional)"
                  multiline
                  rowsMax={10}
                  rows={5}
                  size="medium"
                  value={TextValue}
                  onChange={handleTextChange}
                  fullWidth="true"
                  variant="outlined"
                />
              </Grid>
              </Grid>

              <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table"
                  >
                    <EnhancedTableHead
                      classes={classes}
                      numSelected={selected.length}
                      onSelectAllClick={handleSelectAllClick}
                      rowCount={rows.length}
                    />
                    <TableBody>
                      {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.QuestionID);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row.QuestionID)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.question}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </TableCell>
                              <TableCell component="th" id={labelId} scope="row" padding="none">
                                {row.question}
                              </TableCell>
                              <TableCell align="left">{row.planet}</TableCell>
                              <TableCell align="left">{row.question}</TableCell>
                            </TableRow>
                          );
                        })}

                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>

              <Grid item xs={12}>
              <div>
                <TwitterShareButton
                  title={`Assignment: ${Title}.` + '\n' + `${TextValue}`}
                  
                  url="https://stackoverflow.com/"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>

              </Grid>
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
      
    </div>
    
  );
}
