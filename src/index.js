import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';

// core components
import Admin from "layouts/Admin.js";
import Login from "layouts/Login.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();
axios.defaults.baseURL = "http://localhost:3000/";

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
      <Route path="/" component={Login} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
