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
  const [input, setInput] = React.useState({
    Username: "",
    Password: "",
    Email: "",
    FirstName: "",
    LastName: "",
    LabGroup: "",
    AccountType: "",
    Activation: true
  })

  
  const handleChange = (event) => {
    setInput({
      ...input, 
      [event.target.name]: event.target.value
    })
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = () => {
    axios.post('/CreateAccount', input)
    .then(res => console.log(res))
    .catch(err => console.log(err));
    setOpen(true);
    clearInput();
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
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    name="Email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange = {handleChange}
                    value = {input.Email}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Lab group"
                    name="LabGroup"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange = {handleChange}
                    value = {input.LabGroup}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="User type"
                    name="AccountType"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange = {handleChange}
                    value = {input.AccountType}
                  />
                </GridItem>
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
