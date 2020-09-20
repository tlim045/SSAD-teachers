import React from 'react';
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

const columns = [
  { id: 'galaxy', label: 'Galaxy', minWidth: 100 },
  { id: 'planet', label: 'Planet', minWidth: 100 },
  { id: 'question', label: 'Question', minWidth: 100 }
];

function createData(galaxy, planet, question) {
  return { galaxy, planet, question };
}

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
    // width: 100,
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
  }
}));

export default function ViewQuestions() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom className={classes.typo}>
          All Quizzes
      </Typography>
      <div className={classes.bar}>
          <Button variant="contained">Add new question</Button>
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
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
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
