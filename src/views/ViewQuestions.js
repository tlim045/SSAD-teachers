import React, {useState,Fragment, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';

const columns = [
  { id: 'galaxy', label: 'Galaxy', minWidth: 100 },
  { id: 'planet', label: 'Planet', minWidth: 100 },
  { id: 'question', label: 'Question', minWidth: 100 }
];

function createData(galaxy, planet, question) {
  return { galaxy, planet, question };
};

// Method 1 data retrieval
// var request = require('request');

// var url = 'http://localhost:3000/allQuestions';

// request.get({
//     url: url,
//     json: true,
//     headers: {'User-Agent': 'request'}
//   }, (err, res, data) => {
//     if (err) {
//       console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//       console.log('Status:', res.statusCode);
//     } else {
//       // data is already parsed as JSON:
//       console.log(data.questions);
//     }
// });


const rows = [
  createData('Milky Way', 'Mecurry', 'Which one of the following is not an Evolutionary Process Model?'),
  createData('Milky Way', 'Venus', "The Incremental Model is a result of combination of elements of which two models?"),
  createData('Milky Way', 'Earth', "What is the major advantage of using Incremental Model?"),
  createData('Milky Way', 'Mars', "The spiral model was originally proposed by"),
  createData('Milky Way', 'Jupiter', "The spiral model has two dimensions namely _____________ and ____________"),
  createData('Milky Way', 'Saturn', "How is WINWIN Spiral Model different from Spiral Model?"),
  createData('Milky Way', 'Uranus', "Identify the disadvantage of Spiral Model.")
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-contained':{
      color: 'white',
      background: '#174A84'
    },
    '& > *': {
      margin: theme.spacing(1), 
    }
  },
  paperWrapper: {
    marginTop: '1em',
    width: '100%'
  },
  container: {
    maxHeight: 440,
  },
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 100,
    flex: 1,
    marginLeft: '30em'
  },
  iconButton: {
      padding: 10,
  },
  input: {
      marginLeft: theme.spacing(1),
      flex: 1,
  },
  bar: {
      display: 'flex',
      marginTop: '1em'
  },
  typo: {
    color: "#999"
  },
  cell: {
    color: "#3C4858"
  },
  check: {
    alignItems: 'left',
    flex:5
  },
}));
// Testing of data retrieval 
export default function ViewQuestions() {
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });
  
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = 'http://localhost:3000/allQuestions';
    axios.get(apiUrl).then((allQuestions) => {
      const allData = allQuestions.data;
      setAppState({ loading: false, allQuestions: allData });
    });
  }, [setAppState]);
  console.log(appState);


  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Add dialog
  const [AddOpen, setAddOpen] = React.useState(false);

  const toggleAddModal = () => {
    setAddOpen(true);
  };

  const handleAddOk = () => {
    //TODO: Update DB question 
    setAddOpen(false);
  };

  const handleAddCancel = () => {
      setAddOpen(false);
  };
  // Edit dialog
  const [EditOpen, setEditOpen] = React.useState(false);

  const toggleEditModal = () => {
    setEditOpen(true);
  };

  const handleEditOk = () => {
    //TODO: Update DB question 
    setEditOpen(false);
  };

  const handleEditCancel = () => {
      setEditOpen(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom className={classes.typo}>
          All Quizzes
      </Typography>
      <div className={classes.bar}>
          <Button variant="contained" onClick={toggleAddModal}>Add new question</Button>
          <Dialog open={AddOpen} onClose={handleAddCancel} aria-labelledby="form-dialog-title" maxWidth='xl'>
                        <DialogTitle id="form-dialog-title" color='primary'>Add Question</DialogTitle>
                        <DialogContent>
                        <form className={classes.root} noValidate autoComplete="off">
                          <TextField id="standard-basic" label="Galaxy" required="true" style = {{width: '45%'}}/>
                          <TextField id="standard-basic" label="Planet" required="true" style = {{width: '45%'}}/>
                          <TextField id="standard-basic" label="Quiz Question" fullWidth="true" required="true" style = {{width: '93%'}}/>
                          <Typography variant="h7" >
                              Select the Checkbox with the correct option:
                          </Typography>
                          <div className={classes.check} >
                          <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField id="standard-basic" label="Option 1" required="true" style = {{width: '90%'}}/>
                          </div>
                          <div className={classes.check} >
                          <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField id="standard-basic" label="Option 2" required="true" style = {{width: '90%'}}/>
                          </div>
                          <div className={classes.check} >
                          <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField id="standard-basic" label="Option 3" required="true" style = {{width: '90%'}}/>
                          </div>
                          <div className={classes.check} >
                          <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField id="standard-basic" label="Option 4" required="true" style = {{width: '90%'}}/>
                          </div>

                        </form>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleAddCancel} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={handleAddOk} color="primary">
                            Update Quiz
                          </Button>
                        </DialogActions>
                      </Dialog>
          <Paper component="form" className={classes.searchBar}>
              <InputBase
                  className={classes.input}
                  placeholder="Search..."
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
              </IconButton>
          </Paper>
      </div>
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
                    <IconButton onClick={toggleEditModal}>
                      <EditIcon />
                    </IconButton>
                    <Dialog open={EditOpen} onClose={handleEditCancel} aria-labelledby="form-dialog-title" maxWidth='xl'>
                        <DialogTitle id="form-dialog-title" color='primary'>Edit Question</DialogTitle>
                        <DialogContent>
                        <form className={classes.root} noValidate autoComplete="off">
                          <TextField id="standard-basic" label="Galaxy" required="true" style = {{width: '45%'}}/>
                          <TextField id="standard-basic" label="Planet" required="true" style = {{width: '45%'}}/>
                          <TextField id="standard-basic" label="Quiz Question" fullWidth="true" required="true" style = {{width: '91%'}}/>
                          <Typography variant="h7" >
                          <br></br> {"     "}Select the Checkbox with the correct option:
                          </Typography>
                          <div className={classes.check} >

                          <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField id="standard-basic" label="Option 1" required="true" style = {{width: '90%'}}/>
                          </div>
                          <div className={classes.check} >
                          <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField id="standard-basic" label="Option 2" required="true" style = {{width: '90%'}}/>
                          </div>
                          <div className={classes.check} >
                          <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField id="standard-basic" label="Option 3" required="true" style = {{width: '90%'}}/>
                          </div>
                          <div className={classes.check} >
                          <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField id="standard-basic" label="Option 4" required="true" style = {{width: '90%'}}/>
                          </div>
                        </form>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleEditCancel} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={handleEditOk} color="primary">
                            Update Quiz
                          </Button>
                        </DialogActions>
                      </Dialog>
                    <IconButton>
                      <DeleteIcon/>
                    </IconButton>
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
  );
}

