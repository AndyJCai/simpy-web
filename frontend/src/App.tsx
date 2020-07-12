import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Onboard from "./pages/Onboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import history from "./history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Route exact path="/" component={Onboard} />
          <Route exact path="/home/:user_id" component={Home} />
          <Route exact path="/settings/:user_id" component={Settings} />
        </div>
      </Router>
    </div>
  )
}

export default App;
