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

axios.defaults.baseURL = "http://localhost:3000/";

const columns = [
  { id: 'galaxy', label: 'Galaxy', minWidth: 100 },
  { id: 'planet', label: 'Planet', minWidth: 100 },
  { id: 'question', label: 'Question', minWidth: 100 }
];

const dictOfGalaxy = ["Planning and Definning"];
const dictOfPlanet = ["Decomposition Techniques", "Estimation tools"];

function createData(galaxy, planet, question, difficulty) {
  return { galaxy: dictOfGalaxy[galaxy-1], planet: dictOfPlanet[planet-1], question, difficulty };
}

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
    axios.get('/allQuestions').then((allQuestions) => {
      const allData = allQuestions.data.questions;
      setAppState({ loading: false, allQuestions: allData });
    });
  }, [setAppState]);

  const rows = [];
  appState.allQuestions && appState.allQuestions.forEach(question => rows.push(createData(question.Galaxy, question.Planet, question.Question, question.Difficulty)));

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [checked, setChecked] = React.useState(true);
  const [question, setQuestion] = React.useState({});
  const [inputState, setInput] = React.useState({
    Galaxy: 1,
    Planet: 1,
    Question: "",
    Option1: "",
    Option2: "",
    Option3: "",
    Option4: ""
  });
  const [sameData, setSameData] = React.useState(true);

  const handleChange = (event) => {
    const value = event.target.value;
    setInput({
      ...inputState,
      [event.target.name]: value
    });
    setSameData(checkSame());
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

  const toggleEditModal = (index) => {
    const allQuestions = appState.allQuestions;
    Object.assign(question, allQuestions[index]);
    const newObj = {
      Galaxy: question.Galaxy,
      Planet: question.Planet,
      Question: question.Galaxy,
      Option1: question.Options[1],
      Option2: question.Options[2],
      Option3: question.Options[3],
      Option4: question.Options[4]
    }
    Object.assign(inputState, newObj);

    setInput({
      inputState
    });

    setEditOpen(true);
  };

  const handleEditOk = () => {
    //TODO: Update DB question 
    console.log(inputState);
    setEditOpen(false);
  };

  const handleEditCancel = () => {
      setEditOpen(false);
  };

  const checkSame = () => {
    console.log(question.Question);
    console.log(inputState.Question);
    if(question.Galaxy !== inputState.Galaxy) return false;
    if(question.Planet !== inputState.Planet) return false;
    if(question.Question !== inputState.Question) return false;
    if(question.Options[1] !== inputState.Option1) return false;
    if(question.Options[2] !== inputState.Option2) return false;
    if(question.Options[3] !== inputState.Option3) return false;
    if(question.Options[4] !== inputState.Option4) return false;
    return true; 
  }

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
                    <IconButton onClick={() => toggleEditModal(realIndex)}>
                      <EditIcon />
                    </IconButton>
                    <Dialog open={EditOpen} onClose={handleEditCancel} aria-labelledby="form-dialog-title" maxWidth='xl'>
                        <DialogTitle id="form-dialog-title" color='primary'>Edit Question</DialogTitle>
                        <DialogContent>
                        <form className={classes.root} noValidate autoComplete="off">
                          <TextField name = "Galaxy" id="standard-basic" label="Galaxy" required="true" style = {{width: '45%'}} defaultValue={dictOfGalaxy[question.Galaxy-1]} onChange={handleChange}/>
                          <TextField name = "Planet" id="standard-basic" label="Planet" required="true" style = {{width: '45%'}} defaultValue={dictOfPlanet[question.Planet-1]} onChange={handleChange}/>
                          <TextField name = "Question" id="standard-basic" label="Quiz Question" fullWidth="true" required="true" style = {{width: '91%'}} defaultValue={question.Question} onChange={handleChange}/>
                          <Typography variant="h7" >
                          <br></br> {"     "}Select the Checkbox with the correct option:
                          </Typography>
                          <div className={classes.check} >

                          <Checkbox
                            defaultChecked = {question.CorrectAns == 1}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField name = "Option1" id="standard-basic" label="Option 1" required="true" style = {{width: '90%'}} defaultValue={question.Options && question.Options[1]} onChange={handleChange}/>
                          </div>
                          <div className={classes.check} >
                          <Checkbox
                            defaultChecked = {question.CorrectAns == 2}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField name = "Option2" id="standard-basic" label="Option 2" required="true" style = {{width: '90%'}} defaultValue={question.Options && question.Options[2]} onChange={handleChange}/>
                          </div>
                          <div className={classes.check} >
                          <Checkbox
                            defaultChecked = {question.CorrectAns == 3}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField name = "Option3" id="standard-basic" label="Option 3" required="true" style = {{width: '90%'}} defaultValue={question.Options && question.Options[3]} onChange={handleChange}/>
                          </div>
                          <div className={classes.check} >
                          <Checkbox
                            defaultChecked = {question.CorrectAns == 4}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <TextField name = "Option4" id="standard-basic" label="Option 4" required="true" style = {{width: '90%'}} defaultValue={question.Options && question.Options[4]} onChange={handleChange}/>
                          </div>
                        </form>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleEditCancel} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={handleEditOk} color="primary" disabled={sameData}>
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
