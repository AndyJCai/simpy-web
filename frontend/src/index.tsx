import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Reducer from "./Redux";

let store = createStore(Reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route></Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
