import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
// import Private from "./components/Private";
// import requireAuthentication from "./components/requireAuthentication";
import NotFound from "./components/NotFound";

export default () => (
  <Switch>
    <Route path="/" exact component={Home}>
      {/* <Route path='private' component={requireAuthentication(Private)}>
            <Route path='other' component={...} />
        </Route> */}
    </Route>
    <Route path="/auth/google" />
    <Route component={NotFound} />
  </Switch>
);
