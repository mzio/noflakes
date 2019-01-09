import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Navbar, PageHeader } from "react-bootstrap";
import ReactDOM from "react-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

import Routes from "./Routes";
import Home from "./components/Home";
import CreatePact from "./components/CreatePact";

import "./App.css";

// import { Button } from 'react-bootstrap';
// import TestTable from "./components/TestTable.js";
// import PactForm from "./components/PactForm.js";

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Routes />
          <CreatePact />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
