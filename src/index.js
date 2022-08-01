import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Login from "./login/Login";
import "./assets/css/paper-dashboard.css";

// import "bootstrap/dist/css/bootstrap.min.css"
// import AdminLayout from "./layouts/Admin"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    
      <Route exact path="/login" render={() => <Login />} />
      <Redirect to="/login" />
        {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
              <Redirect to="/admin/dashboard" /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
