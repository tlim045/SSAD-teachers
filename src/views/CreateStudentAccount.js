import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import avatar from "assets/img/faces/marc.jpg";
import axios from 'axios';
axios.defaults.baseURL = "https://ssadteachers.herokuapp.com/";
// axios.defaults.baseURL = "http://localhost:3000/";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = {
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
};

const useStyles = makeStyles(styles);

export default function CreateStudentAccount() {
  const [error, setError] = React.useState({});
  const [input, setInput] = React.useState({
    Username: "",
    Password: "",
    Email: "",
    FirstName: "",
    LastName: "",
    LabGroup: "",
    AccountType: "Student",
    Activation: true
  })

  
  const handleChange = (event) => {
    setInput({
      ...input, 
      [event.target.name]: event.target.value,
      AccountType: "Student"
    })
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const validateEmail = () => {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.Email)) || input.Email === "";
  }

  const handleSubmit = () => {
    var tempError = {}
    for(var key in input){
      if(input[key] === "") tempError[key] = true;
      else delete tempError[key];
    }
    setError(tempError);

    if(Object.keys(tempError).length === 0 && validateEmail()){
      console.log("valid");
    axios.post('/CreateAccount', input)
    .then(res => console.log(res))
    .catch(err => console.log(err));
    setOpen(true);
    clearInput();
    }

  }

  const clearInput = () => {
    setInput({
      Username: "",
      Password: "",
      Email: "",
      FirstName: "",
      LastName: "",
      LabGroup: "",
      AccountType: "",
      Activation: true
    })
  }

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        {/* <GridItem xs={12} sm={12} md={8}> */}
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create a new account</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Username"
                    name="Username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange = {handleChange}
                    value = {input.Username}
                    error={error.Username}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Password"
                    name="Password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange = {handleChange}
                    value = {input.Password}
                    error={error.Password}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    name="FirstName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange = {handleChange}
                    value = {input.FirstName}
                    error={error.FirstName}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    name="LastName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange = {handleChange}
                    value = {input.LastName}
                    error={error.LastName}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    name="Email"
                    emailValidation={validateEmail()}
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange = {handleChange}
                    value = {input.Email}
                    error={error.Email}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Lab group"
                    name="LabGroup"
                    formControlProps={{
                      fullWidth: true
                    }}
                    
                    onChange = {handleChange}
                    value = {input.LabGroup}
                    error={error.LabGroup}
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="User type"
                    name="AccountType"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange = {handleChange}
                    value = {input.AccountType}
                  />
                </GridItem> */}
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleSubmit}>Create new account</Button>
            </CardFooter>
          </Card>
        {/* </GridItem> */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Create account successfully!
          </Alert>
        </Snackbar>
      </GridContainer>
    </div>
  );
}
