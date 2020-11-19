import React from "react";
import { Link } from 'react-router-dom';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon } from "react-share";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from '@material-ui/core/Tooltip';

// radio buttons
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { dictOfGalaxy, dictOfPlanet } from './../../variables/general';
import axios from 'axios';
axios.defaults.baseURL = "https://ssadteachers.herokuapp.com/";
// axios.defaults.baseURL = "http://localhost:3000/";

const headCells = [
  { id: 'galaxy', numeric: false, disablePadding: true, label: 'Galaxy', minWidth: 100 },
  { id: 'planet', numeric: false, disablePadding: false, label: 'Planet', minWidth: 100 },
  { id: 'question', numeric: false, disablePadding: false, label: 'Question', minWidth: 100 }
];

const columns = [
  { id: 'assignmentCode', label: 'Assignment Code', minWidth: 100},
  { id: 'username', label: 'Student Name', minWidth: 100 },
  { id: 'score', label: 'Score (/8)', minWidth: 100 }
];


function createData(galaxy, planet, question, difficulty, QuestionID) {
  return { galaxy: dictOfGalaxy[galaxy-1], planet: dictOfPlanet[planet-1], question, difficulty, QuestionID };
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
  ...styles,
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
      Select 8 Questions
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
  const [assignmentHistory, setAssignmentHistory] = React.useState([]);


  React.useEffect(() => {
    setAppState({ loading: true });
    axios.get('/allQuestions').then((allQuestions) => {
      const allData = allQuestions.data.questions;
      setAppState({ loading: false, allQuestions: allData });
    });

    axios.get('/getAssignmentScore').then(data => {
      setAssignmentHistory(data.data);
    })
    setUpdate(false);
  }, [setAppState, updated]);

  const rows = [];
  const rows2 = [];
  appState.allQuestions && appState.allQuestions.forEach(question => 
    rows.push(createData(question.Galaxy, question.Planet, question.Question, question.Difficulty, question.QuestionID)));

  
  function createData2(assignmentCode, username, score) {
    return { assignmentCode, username, score };
  }
  assignmentHistory.forEach(each => {
    rows2.push(createData2(each.AssignmentCode, each.Username, each.Score));
  })

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

  const handleClick = (event, row) => {

    const selectedIndex = selected.findIndex(x => x.QuestionID === row.QuestionID);
    let newSelected = [];

    if (selectedIndex === -1) { 
      if (selected.length < 8) newSelected = newSelected.concat(selected, row);
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


  const isSelected = (row) => selected.findIndex(x => x.QuestionID === row.QuestionID) !== -1;

  // original 
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // TODO: trigger Reddit/Twiiter base on value
  }

  const [openSuccessMessage, setOpenSuccessMessage] = React.useState(false);

  // text field
  const [TextValue, setTextValue] = React.useState('');
  const [Title, setTitle] = React.useState('');

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const [previewOpen, setPreviewOpen] = React.useState(false);

  const previewAssignment = () => {
    setPreviewOpen(true);
  }

  const handleClosePreviewAssignment = () => {
    setPreviewOpen(false);
  }

  const [urlCode, setUrlCode] = React.useState("");

  const saveAssignment = () => {
    const data = {
      username: "AXHGK",
      questions: selected.map(each => each.QuestionID)
    };
    axios.post('/CreateAssignment', data)
    .then(res => {
      setUrlCode(res.data);
      setOpenSuccessMessage(true);
    })
    .catch(err => console.log(err));
  } 

  

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Assignment history</h4>
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
          {rows2.map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
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
  </Paper>
  </CardBody>
  </Card>
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
                          const isItemSelected = isSelected(row);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row)}
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
                                {row.galaxy}
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
                <Button onClick={previewAssignment} color="primary" round>
                  Preview assignment
                </Button>
              </div>

              <Dialog open={previewOpen} onClose={handleClosePreviewAssignment} aria-labelledby="form-dialog-title" maxWidth='xl'>
                <DialogTitle id="form-dialog-title" color='primary'>Preview Assignment</DialogTitle>
                <DialogContent>
                  <Typography>This assignment will be shared on your Twitter</Typography>
                  <h4>{Title}</h4>
                  <h4>{`${TextValue}`}</h4>
                  <Typography>List of 8 questions</Typography>
                  <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {headCells.map((column) => (
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
                      {selected.map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {headCells.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                </DialogContent>
                <DialogActions>
                    {urlCode === "" 
                    ?
                      <div>
                        <Button onClick={handleClosePreviewAssignment} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={saveAssignment} color="primary">
                          Save
                        </Button>
                      </div> 
                    :
                    (selectedValue === 'a' ? 
                    <Tooltip
                    id="tooltip-top"
                    title="Share on your Twitter"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}>
                        <TwitterShareButton
                        title={`${Title}. \n \n \n ${TextValue}. \n \n \n`}
                        
                        url={`\n ${urlCode}`}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                    </Tooltip>
                    : 
                    <Tooltip
                    id="tooltip-top"
                    title="Share on your Reddit"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}>
                        <RedditShareButton
                        title={`${Title}. \n \n \n ${TextValue}. \n \n \n`}
                        
                        url={`\n ${urlCode}`}
                      >
                        <RedditIcon size={32} round />
                      </RedditShareButton>
                    </Tooltip>
                    )
                    }
                  </DialogActions>
              </Dialog>

              </Grid>
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
      <Snackbar open={openSuccessMessage} autoHideDuration={6000} onClose={() => setOpenSuccessMessage(false)}>
          <Alert onClose={() => setOpenSuccessMessage(false)} severity="success">
              Assignment is saved. You can now share it!
          </Alert>
      </Snackbar>
      
    </div>
    
  );
}