import React, { Component } from "react";
import HomeDefault, { HomeSignIn, HomeProfile } from "./HomeStates.js";
import Login from "./Login.js";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { signedIn: false, user: null };
  }

  componentWillMount() {
    fetch("/api/auth/username")
      .then(res => res.json())
      .then(json => {
        let resData = json.data;
        if (resData.exists && resData.username) {
          this.setState({ signedIn: true, user: resData.username });
        } else if (resData.exists && !resData.username) {
          this.setState({ signedIn: true });
        }
      });
  }

  render() {
    console.log(this.state);
    console.log(this.state.signedIn && this.state.user);
    console.log(this.state.signedIn && !this.state.user);
    if (this.state.signedIn && this.state.user) {
      console.log("profile");

      return <HomeProfile />;
    } else if (this.state.signedIn && !this.state.user) {
      console.log("signin");

      return <HomeSignIn />;
    } else {
      console.log("default");

      return <HomeDefault />;
    }
  }
}
