import React, { Component } from "react";
import { hot } from "react-hot-loader";
import NavMenu from "./components/NavMenu/NavMenu";
import ReactDOM from "react-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

import Routes from "./Routes";

import "./App.css";

// import { Button } from 'react-bootstrap';
// import TestTable from "./components/TestTable.js";
// import PactForm from "./components/PactForm.js";

class App extends Component {
  render() {
    return (
      <div>
        <NavMenu />
        <div className="App">
          <Routes />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
