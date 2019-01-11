import React, { Component } from "react";
import HomeDefault, { HomeSignIn, HomeProfile } from "./HomeStates.js";
import Login from "./Login.js";
import "./Home.css";

import PactAddUserForm from "./PactAddUserForm"; // REACT COMPONENT DEV ZONE

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      signedIn: false,
      user: null,
      firstName: null,
      dev: false
    };
  }

  componentWillMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        let resData = json.data;
        this.setState({ dev: false });
        this.setState({ ready: true });
        if (resData.exists && resData.user) {
          this.setState({
            signedIn: true,
            user: resData.user
          });
        } else if (resData.exists && !resData.user) {
          this.setState({ signedIn: true });
        }
      });
  }

  render() {
    // REACT COMPONENT DEV ZONE
    if (!this.state.ready && this.state.dev) {
      console.log("React Component Dev Zone");
      return <PactAddUserForm />;
    }
    if (!this.state.ready) {
      return <div />;
    } else if (this.state.signedIn && this.state.user) {
      return (
        <HomeProfile
          userFirstName={this.state.user.firstName}
          user={this.state.user}
        />
      );
    } else if (this.state.signedIn && !this.state.user) {
      return <HomeSignIn />;
    } else {
      return <HomeDefault />;
    }
  }
}
