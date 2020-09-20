import React from "react";
import spaceImg from "../assets/img/space.png";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: '75%',
      position: 'absolute',
      top: '20%',
      bottom: '20%',
      left: 0,
      right: 0,
      margin: 'auto',
      overflow: 'hidden',
      flexDirection: 'row'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '0 0 auto',
      padding: 0
    },
    cover: {
      width: 670.5,
      height: 504,
      marginRight: 0
    },
    login: {
        background: "#F2F1F3",
        width: '100%',
        height: '60vh'
    },
    loginBox: {
        textAlign: 'center',
        padding: '20% 0',
        margin: 'auto',
        '& .MuiTextField-root': {
            margin: 20,
            width: '80%',
        },
        '& .MuiFilledInput-root': {
            background: 'white'
        },
        '& .MuiButton-contained':{
            marginTop: '2em',
            color: 'white',
            background: '#174A84'
        }
    }
  }));

  
export default function Login({ ...rest }) {
    const classes = useStyles();
    return <div style={{ background: '#174A84', height: '100vh',  width: '100%'}}> 
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <div className={classes.login}>
                    <div className={classes.loginBox}>
                        <TextField id="filled-basic" label="Username" variant="filled" />
                        <TextField id="filled-basic" label="Password" type="password" variant="filled" />
                        <Button variant="contained" href="/admin/dashboard">Login</Button>
                    </div>
                </div>
                </CardContent>
            </div>
            <CardMedia
                className={classes.cover}
                image={spaceImg}
                title="Live from space album cover"
            />
        </Card>
    </div>
}
