import React from "react";
import PactViewer from "./PactViewer";

class ViewPacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userReady: false,
      user: null,
      pacts: []
    };
    this.handleAccept = this.handleAccept.bind(this);
  }

  componentWillMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        if (json.data.exists) {
          this.setState({ user: json.data.user, userReady: true });
          for (
            var i = 0;
            i < json.data.user.pacts[this.params.mode].length;
            ++i
          ) {
            let pactId = json.data.user.pacts[this.params.mode][i];
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

  handleAccept(event) {
    fetch(
      "/api/pacts/" + event.target.pactId + "/" + this.state.user.username,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "accepted" })
      }
    );
  }

  render() {
    if (!this.state.userReady) {
      return <div />;
    } else {
      var pacts = this.state.pacts.map(pact => {
        return (
          <div>
            <PactViewer pact={pact} />{" "}
            <Button pactId={pact._id} onClick={this.handleAccept}>
              Accept
            </Button>
          </div>
        );
      });

      return (
        <div class="Profile">
          <h1>
            {this.state.user.firstName}'s {this.params.mode} Pacts
          </h1>
          <div>{pacts}</div>
        </div>
      );
    }
  }
}

export default ViewPacts;
