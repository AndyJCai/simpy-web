import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route></Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
