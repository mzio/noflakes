import React from "react";
import Main from "./components/Main";
import { hot } from "react-hot-loader";
import NavMenu from "./components/NavMenu/NavMenu";

const App = () => (
  <div className="App">
    <NavMenu />
    <Main />
  </div>
);

export default hot(module)(App);
