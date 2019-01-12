import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./Navigation.css";

// <Logout show={this.}
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    };
  }
  render() {
    if (this.state.show) {
      return (
        <a id="logout" className="menu-item" href="/logout">
          Logout
        </a>
      );
    } else {
      return <span />;
    }
  }
}

// <Navigation />
export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }
  showSettings(event) {
    event.preventDefault();
  }

  componentWillMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        this.setState({ signedIn: json.data.exists });
        console.log(this.state.signedIn);
        console.log(json.data.exists);
      });
  }

  render() {
    return (
      <Menu right>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <Link id="about" className="menu-item" to="/about">
          About
        </Link>
        <Logout show={this.state.signedIn} />
      </Menu>
    );
  }
}
