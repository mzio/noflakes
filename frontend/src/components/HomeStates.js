import React, { Component } from "react";
import Login from "./Login.js";
if (process.env.BROWSER) require("./HomeStates.css");
import NewUserForm from "./NewUserForm";
import ProfileMenu from "./ProfileMenu";
import SnowFlakes from "./SnowFlakes";

export default class HomeDefault extends Component {
  // Default display
  render() {
    return (
      <div>
        {/* <SnowFlakes /> */}
        <div className="HomeDefault">
          <div className="lander">
            <h1>"Noflakes"</h1>
            <p>There's only snow much time in the world.</p>
            <Login />
          </div>
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
  // For signed in user, display menu: create pacts, see active pacts, see past pacts
  constructor(props) {
    super(props);
    this.state = { userFirstName: props.userFirstName };
  }
  render() {
    return (
      <div className="HomeDefault">
        <div className="lander">
          <h1>Hi {this.state.userFirstName}!</h1>
          <ProfileMenu user={this.props.user} />
        </div>
      </div>
    );
  }
}
