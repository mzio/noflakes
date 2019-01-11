import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import CreatePact from "./components/CreatePact";
import NotFound from "./components/NotFound";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    {/* <Route path="/createPact" render={props => <CreatePact {...props} />} /> */}
    <Route path="/createPact" exact component={CreatePact} />
    <Route path="/profile" exact component={Home} />
    <Route component={NotFound} />
  </Switch>
);
