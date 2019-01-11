import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Navigation from "./components/Navigation.js";
import ReactDOM from "react-dom";
import { Container, Row } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

import Routes from "./Routes";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import CreatePact from "./components/CreatePact";

import "./App.css";

// import { Button } from 'react-bootstrap';
// import TestTable from "./components/TestTable.js";
// import PactForm from "./components/PactForm.js";

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="NavRow">
          <Navigation />
        </Row>
        <Row>
          <div className="App">
            <Routes />
            {/* <Link to="/createPact">Test this link actually</Link>
          <HomeSignIn /> */}
          </div>
        </Row>
      </Container>
    );
  }
}

export default hot(module)(App);
