import React from "react";
import PactViewer from "./PactViewer";

class ViewPacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userReady: false,
      user: null,
      pacts: []]
    };
  }

  componentWillMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        if (json.data.exists) {
          this.setState({ user: json.data.user, userReady: true });
          for (var i = 0; i < json.data.user.pacts.pending; ++i) {
            let pactId = json.data.user.pacts.pending[i];
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
      var pacts = this.state.data.pacts.map(pact => {
        return <PactViewer pact={pact} />;
      });

      return (
        <div class="Profile">
          <h1>{this.state.user.firstName}'s Pacts</h1>
          <div>{pacts}</div>
        </div>
      );
    }
  }
}

export default ViewPacts;
