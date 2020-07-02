import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Onboard from "./pages/Onboard";
import Home from "./pages/Home";
import history from "./history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Route exact path="/" component={Onboard} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    </div>
  )
}

export default App;
