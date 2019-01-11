import React from "react";
import { Link } from "react-router-dom";

// Super jank 0/5 style can't think about handling props rn
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
        <a id="logout" href="/logout">
          Logout
        </a>
      );
    } else {
      return <span />;
    }
  }
}

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }

  componentDidMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        this.setState({ signedIn: json.data.exists });
        console.log(this.state.signedIn);
        console.log(json.data.exists);
      });
  }

  render() {
    if (this.state.signedIn) {
      return (
        <div className="menu">
          <ul>
            <a id="home" onClick={close} href="/">
              Home
            </a>
            <Link id="about" onClick={close} to="/about">
              About
            </Link>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="menu">
          <ul>
            <a id="home" onClick={close} href="/">
              Home
            </a>
            <Link id="about" onClick={close} to="/about">
              About
            </Link>
            <a onClick={close} href="/logout">
              Logout
            </a>
          </ul>
        </div>
      );
    }
  }
}
