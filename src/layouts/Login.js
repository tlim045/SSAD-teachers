import React from "react";
import spaceImg from "../assets/img/space.png";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useAuth0 } from '@auth0/auth0-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// const LoginButton = () => {
//     const { loginWithRedirect } = useAuth0();

//     return(
//         <button onClick={() => loginWithRedirect()}>
//             Log In
//         </button>
//     )
// }

// export default LoginButton

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
      width: '100%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center'
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
    },
    center: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
      },

  }));

  
export default function Login({ ...rest }) {
    const classes = useStyles();
       const { loginWithRedirect } = useAuth0();
    return <div style={{ background: '#174A84', height: '100vh',  width: '100%'}}> 
         <Card className={classes.root}>
             <CardMedia
                 className={classes.cover}
                 image={spaceImg}
                 title="Live from space album cover"
                
             />
            <Grid item xs={12} sm={12} md={4} lg={4}
                        style={{
                            textAlign:'center',
                            width:300,
                            paddingTop:180,
                            paddingLeft:0,
                            height:300
                        }}
                    >
                 <Button classes='center' size='large' variant="contained" color="primary" onClick={() => loginWithRedirect()}>Login</Button>
             </Grid>
        </Card>
     </div>
 }
