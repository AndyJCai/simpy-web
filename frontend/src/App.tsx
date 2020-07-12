import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Onboard from "./pages/Onboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Error from "./pages/Error";
import history from "./history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Route exact path="/" component={Onboard} />
          <Route exact path="/home/:userId" component={Home} />
          <Route exact path="/settings/:userId" component={Settings} />
          <Route exact path="/auth/:accessToken/:refreshToken/:userId" component={Auth} />
          <Route exact path="/error/:errorMsg" component={Error} />
        </div>
      </Router>
    </div>
  )
}

export default App;
