import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import CreatePact from "./components/CreatePact";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import ViewPacts from "./components/ViewPacts";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/viewPacts" exact component={ViewPacts} />
    <Route path="/createPact" render={props => <CreatePact {...props} />} />
    <Route component={NotFound} />
  </Switch>
);
