import React from "react";
import fetch from "isomorphic-fetch";
import NotFound from "./NotFound";
import PactActions from "./PactActions";
if (process.env.BROWSER) require("./CreatePact.css");

class PactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pactReady: false,
      usernameReady: false,
      pact: null,
      username: null
    };
  }

  componentWillMount() {
    if (this.props.match.params.pactId) {
      fetch("/api/pacts/" + this.props.match.params.pactId)
        .then(res => res.json())
        .then(json => {
          this.setState({ pact: json.data, pactReady: true });
        });
    } else {
      this.setState({ pactReady: true });
    }
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        this.setState({
          username: json.data.user.username,
          usernameReady: true
        });
      });
  }

  render() {
    if (!this.state.pactReady || !this.state.usernameReady) {
      return <div />;
    } else {
      console.log(this.state.pact);
      return (
        <div className="PactDetails">
          <h1 className="hd2">{this.state.pact.name}</h1>
          <div>{this.state.pact.description}</div>
          <PactActions username={this.state.username} pact={this.state.pact} />
        </div>
      );
    }
  }
}

export default PactDetails;
