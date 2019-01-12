import React, { Component } from "react";
import Login from "./Login.js";
if (process.env.BROWSER) require("./HomeStates.css");
import NewUserForm from "./NewUserForm";
import ProfileMenu from "./ProfileMenu";
import SnowFlakes from "./SnowFlakes";
import StickyHeader from "react-sticky-header";
if (process.env.BROWSER) require("./StickyHeader.css");
if (process.env.BROWSER) require("./CreatePact.css");
import PactViewer from "./PactViewer";

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
      pacts: []
    };
  }
  componentWillMount() {
    for (var i = 0; i < this.state.user.pacts["accepted"].length; ++i) {
      let pactId = this.state.user.pacts["accepted"][i];
      fetch("/api/pacts/" + pactId)
        .then(res => res.json())
        .then(json => {
          if (json.status === "success") {
            this.setState({
              pacts: this.state.pacts.concat([json.data])
            });
          }
        });
    }
  }
  render() {
    var pacts = this.state.pacts.map(pact => {
      return (
        <PactViewer
          pact={pact}
          username={this.state.user.username}
          mode="accepted"
        />
      );
    });
    return (
      <div>
        <StickyHeader
          // This is the sticky part of the header.
          header={
            <div className="StickyHeader">
              <div className="hd3 marginSpace5rem" />
              <div className="Header_root">
                <h1 className="Header_title hd2">
                  Hi {this.state.userFirstName}!
                </h1>
              </div>
              <div className="hd3">
                Pending pacts: {this.state.user.pacts["pending"].length}
              </div>
            </div>
          }
          backgroundColor="#fff"
        >
          <section>
            <p>
              This section will be what the sticky header scrolls over before
              entering into sticky state. See the gif above or run the test
              story book to see examples.
            </p>
            {/* <div class="list-group">{pacts}</div> */}
          </section>
        </StickyHeader>

        {/* <ViewPacts mode="accepted" /> */}
        {/* <div className="HomeDefault">
          <div className="lander">
            <h1>Hi {this.state.userFirstName}!</h1>
            <div>-------------</div>
            <ProfileMenu user={this.props.user} />
          </div>
        </div> */}
        <div class="list-group">{pacts}</div>
      </div>
    );
  }
}
