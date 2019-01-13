import React from "react";
import PactViewer from "./PactViewer";
import { Button } from "react-bootstrap";
import fetch from "isomorphic-fetch";
import HeaderPacts from "./HeaderPacts";
if (process.env.BROWSER) require("./ViewPacts.css");
if (process.env.BROWSER) require("./CreatePact.css");
if (process.env.BROWSER) require("./Header.css");

class ViewPacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userReady: false,
      user: null,
      pacts: []
    };
  }

  componentWillMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        if (json.data.exists) {
          this.setState({ user: json.data.user, userReady: true });
          for (
            var i = 0;
            i < json.data.user.pacts[this.props.match.mode].length;
            ++i
          ) {
            let pactId = json.data.user.pacts[this.props.match.mode][i];
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
        } else {
          //Handle if user is not logged in
        }
      });
  }

  render() {
    if (!this.state.userReady) {
      return <div />;
    } else {
      var pacts = this.state.pacts.map(pact => {
        return (
          <PactViewer
            pact={pact}
            username={this.state.user.username}
            mode={this.props.match.mode}
          />
        );
      });

      return (
        <div class="Pacts">
          <HeaderPacts
            defaultText={`${this.props.match.mode.charAt(0).toUpperCase() +
              this.props.match.mode.toLowerCase().slice(1)}
            Pacts`}
            secondaryText=""
            tertiaryText=""
          />
          {/* <h1 className="hd1">
            {this.props.match.mode.charAt(0).toUpperCase() +
              this.props.match.mode.toLowerCase().slice(1)}{" "}
            Pacts
          </h1> */}
          <div className="belowHeaderContent-pacts">
            <div class="list-group">{pacts}</div>
          </div>
        </div>
      );
    }
  }
}

export default ViewPacts;
