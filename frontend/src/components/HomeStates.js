import React, { Component } from "react";
import Login from "./Login.js";
if (process.env.BROWSER) require("./HomeStates.css");
import NewUserForm from "./NewUserForm";
if (process.env.BROWSER) require("./CreatePact.css");
import PactViewer from "./PactViewer";
import PactTypeSwitcher from "./PactTypeSwitcher";

import Header from "./Header.js";

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
    this.state = {
      userFirstName: props.userFirstName,
      user: props.user,
      pactsActive: [],
      pactsPending: []
    };
  }
  componentWillMount() {
    for (var i = 0; i < this.state.user.pacts["active"].length; ++i) {
      let pactId = this.state.user.pacts["active"][i];
      fetch("/api/pacts/" + pactId)
        .then(res => res.json())
        .then(json => {
          if (json.status === "success") {
            this.setState({
              pactsActive: this.state.pactsActive.concat([json.data])
            });
          }
        });
    }
    for (var i = 0; i < this.state.user.pacts["pending"].length; ++i) {
      let pactId = this.state.user.pacts["pending"][i];
      fetch("/api/pacts/" + pactId)
        .then(res => res.json())
        .then(json => {
          if (json.status === "success") {
            this.setState({
              pactsPending: this.state.pactsPending.concat([json.data])
            });
          }
        });
    }
  }
  componentDidMount() {
    console.log("Mounted Call");
    console.log(this.state);
  }
  render() {
    var pactsActive = this.state.pactsActive.map(pact => {
      return (
        <PactViewer
          pact={pact}
          username={this.state.user.username}
          mode="active"
        />
      );
    });
    var pactsPending = this.state.pactsPending.map(pact => {
      return (
        <PactViewer
          pact={pact}
          username={this.state.user.username}
          mode="pending"
        />
      );
    });
    console.log("Render Call");
    console.log(pactsActive);
    return (
      <div>
        <Header
          defaultText={`Hi ${this.state.userFirstName}!`}
          secondaryText={`username: ${this.state.user.username}`}
          tertiaryText={`You have ${
            this.state.user.pacts["active"].length
          } active pacts and ${
            this.state.user.pacts["pending"].length
          } pending pacts.`}
        />
        <div className="belowHeaderContent">
          {/* <PactTypeSwitcher
            activeMessage={`You have ${
              this.state.user.pacts["active"].length
            } active pacts.`}
            pendingMessage={`You have ${
              this.state.user.pacts["pending"].length
            } pending pacts.`}
            pactsActive={pactsActive}
            pactsPending={pactsPending}
          /> */}
          {/* <PactTypeSwitcher
            activeMessage={`You have ${
              this.state.user.pacts["active"].length
            } active pacts.`}
            pendingMessage={`You have ${
              this.state.user.pacts["pending"].length
            } pending pacts.`}
            pactsActive={pactsActive}
            pactsPending={pactsPending}
            numActive={this.state.user.pacts["active"].length}
            numPending={this.state.user.pacts["pending"].length}
          /> */}
          <div className="pactType">Active Pacts</div>
          <div class="list-group">{pactsActive}</div>
          <div className="pactType">Pending Pacts</div>
          <div class="list-group">{pactsPending}</div>
        </div>
      </div>
    );
  }
}
