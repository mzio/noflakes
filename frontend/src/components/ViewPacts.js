import React from "react";
import PactViewer from "./PactViewer";
import { Button } from "react-bootstrap";
import fetch from "isomorphic-fetch";

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
    console.log(this.props);
    console.log(this.state);
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        if (json.data.exists) {
          this.setState({ user: json.data.user, userReady: true });
          for (
            var i = 0;
            i < json.data.user.pacts[this.props.route.mode].length;
            ++i
          ) {
            let pactId = json.data.user.pacts[this.props.route.mode][i];
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
            mode={this.props.route.mode}
          />
        );
      });

      return (
        <div class="Pacts">
          <h1>
            {this.props.route.mode.charAt(0).toUpperCase() +
              this.props.route.mode.toLowerCase().slice(1)}{" "}
            Pacts
          </h1>
          <div class="list-group">{pacts}</div>
        </div>
      );
    }
  }
}

export default ViewPacts;
