import React from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { lighten, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiButton-contained':{
            color: 'white',
            background: '#174A84'
        }
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
    }
}));

const rows = [
    ["Milky Way", "Mecurry", "Which one of the following is not an Evolutionary Process Model?"],
    ["Milky Way", "Venus", "The Incremental Model is a result of combination of elements of which two models?"],
    ["Milky Way", "Earth", "What is the major advantage of using Incremental Model?"],
    ["Milky Way", "Mars", "The spiral model was originally proposed by"],
    ["Milky Way", "Jupiter", "The spiral model has two dimensions namely _____________ and ____________"],
    ["Milky Way", "Saturn", "How is WINWIN Spiral Model different from Spiral Model?"],
    ["Milky Way", "Uranus", "Identify the disadvantage of Spiral Model."]
];

const headCells = [
    { id: 'galaxy', disablePadding: true, label: 'Galaxy' },
    { id: 'pLanet', disablePadding: false, label: 'Planet' },
    { id: 'question', disablePadding: false, label: 'Question' }
  ];

export default function ViewQuestions({ ...rest }) {
    const classes = useStyles();
    return <div className={classes.root}>
        <Typography variant="h4" component="h2" gutterBottom>
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
        <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'default'}
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
    </div>
}
