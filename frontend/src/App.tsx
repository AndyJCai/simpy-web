import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Onboard from "./pages/Onboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Error from "./pages/Error";
import ProtectedRoute from "./routes/ProtectedRoute";

import history from "./history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Onboard} />
          <ProtectedRoute exact path="/home/:userId" component={Home} />
          <ProtectedRoute exact path="/settings/:userId" component={Settings} />
          <Route exact path="/auth/:accessToken/:refreshToken/:userId/:expiresIn" component={Auth} />
          <Route exact path="/error/:errorMsg" component={Error} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
