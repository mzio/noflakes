import React, { Component } from "react";
import Login from "./Login.js";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>"Noflakes"</h1>
          <p>There's only snow much time in the world.</p>
          <Login />
        </div>
      </div>
    );
  }
}
