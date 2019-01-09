import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Navbar, PageHeader } from "react-bootstrap";
import ReactDOM from "react-dom";
import Home from "./components/Home";

import "./App.css";

// import { Button } from 'react-bootstrap';
// import TestTable from "./components/TestTable.js";
// import PactForm from "./components/PactForm.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default hot(module)(App);
