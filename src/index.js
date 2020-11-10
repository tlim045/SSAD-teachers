import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';
// core components
import Admin from "layouts/Admin.js";
import Login from "layouts/Login.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

import ProtectedRoute from "././layouts/protected-route";
import { useAuth0 } from "@auth0/auth0-react";

const hist = createBrowserHistory();
axios.defaults.baseURL = "https://ssadteachers.herokuapp.com/";
// axios.defaults.baseURL = "http://localhost:3000/";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(

  <Auth0Provider 
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin+'/admin/dashboard'}>
    {/* <Login /> */}
    <Router history={hist}>
    <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/admin" component={Admin} />
    </Switch>
  </Router>
  </Auth0Provider>,


  document.getElementById("root")
);
