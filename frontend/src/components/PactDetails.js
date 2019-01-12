import React from "react";
import fetch from "isomorphic-fetch";
import NotFound from "./NotFound";

class PactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      pact: null
    };
  }

  componentWillMount() {
    if (this.props.match.params.pactId) {
      fetch("/api/pacts/" + this.props.match.params.pactId)
        .then(res => res.json())
        .then(json => {
          this.setState({ pact: json.data, ready: true });
        });
    } else {
      this.setState({ ready: true });
    }
  }

  render() {
    if (!this.state.ready) {
      return <div />;
    } else if (!this.state.pact) {
      return <NotFound />;
    } else {
      return (
        <div className="Profile">
          <h1>{this.state.user.firstName}'s Profile</h1>
          <h3>Details</h3>
          <div>
            <div>
              Name: {this.state.user.firstName} {this.state.user.lastName}
            </div>
            <div>Username: {this.state.user.username}</div>
          </div>
          <h3>Flake Forecast&trade;</h3>
          {this.evaluateScore(this.state.user.score)}
        </div>
      );
    }
  }
}

export default PactDetails;
