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
    {/* <Route path="/createPact" render={props => <CreatePact {...props} />} /> */}
    <Route path="/createPact" exact component={CreatePact} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/viewPacts/:mode" exact component={ViewPacts} />
    <Route component={NotFound} />
  </Switch>
);
