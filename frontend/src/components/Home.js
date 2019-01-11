import React, { Component } from "react";
import HomeDefault, { HomeSignIn, HomeProfile } from "./HomeStates.js";
import Login from "./Login.js";
import "./Home.css";

import ProfileMenu from "./ProfileMenu.js"; // REACT COMPONENT DEV ZONE

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      signedIn: false,
      user: null,
      firstName: null
    };
  }

  componentWillMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        let resData = json.data;
        if (resData.exists && resData.user) {
          this.setState({
            ready: true,
            signedIn: true,
            user: resData.user
          });
        } else if (resData.exists && !resData.user) {
          this.setState({ ready: true, signedIn: true });
        } else if (!resData.exists && !resData.username) {
          this.setState({ ready: true });
        }
      });
  }

  render() {
    // REACT COMPONENT DEV ZONE
    if (!this.state.ready) {
      console.log("React Component Dev Zone");
      return <ProfileMenu />;
    }
    if (!this.state.ready) {
      return <div />;
    } else if (this.state.signedIn && this.state.user) {
      return <HomeProfile userFirstName={this.state.user.firstName} />;
    } else if (this.state.signedIn && !this.state.user) {
      return <HomeSignIn />;
    } else {
      return <HomeDefault />;
    }
  }
}
