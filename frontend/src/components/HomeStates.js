import React, { Component } from "react";
import Login from "./Login.js";
import "./HomeStates.css";
import NewUserForm from "./NewUserForm";

export default class HomeDefault extends Component {
  // Default display
  render() {
    return (
      <div className="HomeDefault">
        <div className="lander">
          <h1>"Noflakes"</h1>
          <p>There's only snow much time in the world.</p>
          <Login />
        </div>
      </div>
    );
  }
}

export class HomeSignIn extends Component {
  // For new user; asks for username
  constructor(props) {
    super(props);
    this.state = { validUsername: false };
  }
  render() {
    return (
      <div className="HomeDefault">
        <div className="lander">
          <h1>Looks like it's your first time here</h1>
          <NewUserForm />
        </div>
      </div>
    );
  }
}

export class HomeProfile extends Component {
  // For signed in user
  constructor(props) {
    super(props);
    this.state = { user: props.user };
  }
  render() {
    return (
      <div className="HomeDefault">
        <div className="lander">
          <h1>`Hi ${this.state.user}`</h1>
          {/* username collection form component */}
        </div>
      </div>
    );
  }
}
