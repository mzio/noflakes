import React, { Component } from "react";
import HomeDefault, { HomeSignIn, HomeProfile } from "./HomeStates.js";
import Login from "./Login.js";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { signedIn: false, user: null };
  }

  componentDidMount() {
    fetch("api/auth/username", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.text().then(res => {
        console.log(res);
        res.json().then(json => {
          let resData = json.data;
          if (resData.exists && resData.username) {
            this.setState({ signedIn: true, user: resData.username });
          } else if (resData.exists && !!resData.username) {
            this.setState({ signedIn: true });
          }
        });
      })
    );
  }

  render() {
    console.log(this.state);
    if (this.state.signedIn && this.state.user) {
      return <HomeProfile />;
    } else if (this.state.signedIn && !this.state.user) {
      return <HomeSignIn />;
    } else {
      return <HomeDefault />;
    }
  }
}
