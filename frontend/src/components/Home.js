import React, { Component } from "react";
import HomeDefault, { HomeSignIn, HomeProfile } from "./HomeStates.js";
import Login from "./Login.js";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { ready: false, signedIn: false, user: null, firstName: null };
  }

  componentWillMount() {
    fetch("/api/auth/username")
      .then(res => res.json())
      .then(json => {
        let resData = json.data;
        if (resData.exists && resData.username) {
          this.setState({
            ready: true,
            signedIn: true,
            user: resData.username,
            firstName: resData.firstName
          });
        } else if (resData.exists && !resData.username) {
          this.setState({ ready: true, signedIn: true });
        } else {
          this.setState({ ready: true });
        }
      })
      .catch(function() {
        console.log("React Component Development Zone");
      });
  }

  render() {
    if (!this.state.ready) {
      return <div />;
    } else if (this.state.signedIn && this.state.user) {
      return <HomeProfile userFirstName={this.state.firstName} />;
    } else if (this.state.signedIn && !this.state.user) {
      return <HomeSignIn />;
    } else {
      return <HomeDefault />;
    }
  }
}
