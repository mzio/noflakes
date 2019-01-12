import React from "react";
import { Button } from "react-bootstrap";
import fetch from "isomorphic-fetch";
if (process.env.BROWSER) require("./ViewPacts.css");

class PactActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: false,
      expiry: null,
      verify: "",
      userFirstNames: {},
      responses: {}
    };

    this.timer = null;
    this.refreshVerify = this.refreshVerify.bind(this);
    this.handleSubmitResults = this.handleSubmitResults.bind(this);
  }

  timeUntil(date) {
    var seconds = Math.floor((date - new Date()) / 1000);
    if ((seconds < 0) | (seconds >= 86400)) {
      return "";
    }

    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  componentWillMount() {
    this.setState({
      responses: { [this.props.username]: "user" }
    });
    var i = this.props.pact.users.indexOf(this.props.username);
    var expiry = new Date(this.props.pact.endTime);
    this.props.pact.users.map(username => {
      fetch("/api/users/" + username)
        .then(res => res.json())
        .then(json => {
          if (json.status === "success") {
            this.setState({
              userFirstNames: {
                ...this.state.userFirstNames,
                [username]: json.data.firstName
              }
            });
          }
        });
    });

    this.setState({
      pending: i >= 0 && this.props.pact.userStatus[i] === "pending",
      expiry: expiry,
      verify: this.timeUntil(expiry)
    });

    this.timer = setInterval(this.refreshVerify, 1000);
  }

  refreshVerify() {
    let now = new Date();
    this.setState({
      verify: this.timeUntil(expiry)
    });
    if (!this.state.verify) {
      clearInterval(timer);
    }
  }

  handleAccept(event) {
    fetch(
      "/api/pacts/" + this.props.pact._id + "/users/" + this.props.username,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "accepted" })
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          this.setState({ pending: false });
        }
      });
  }

  handleSubmitResults(event) {
    if (Object.values(this.state.responses).length < this.users.length) {
      //maybe show modal to describe error
      return;
    } else {
      this.clearInterval(this.timer);
      this.setState({
        verify: ""
      });
      this.state.responses.map((username, response) => {
        if (response !== "user") {
          fetch("/api/users/" + username + "/score", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              result: response,
              size: this.props.pact.users.length - 1
            })
          });
        }
      });
      fetch("/api/pacts/" + this.props.pact._id + "/users/" + username, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "inactive" })
      });
    }
  }

  render() {
    if (pending) {
      return (
        <div>
          <h3 className="hd3">
            Respond to {this.props.pact.owner.firstName}'s invite
          </h3>
          <Button onClick={this.handleAcceptPending} variant="outline-primary">
            Accept
          </Button>
          <Button onClick={this.handleIgnorePending} variant="outline-primary">
            Ignore
          </Button>
        </div>
      );
    } else if (verify) {
      responses = this.props.pact.users.map(user => {
        if (user === this.props.username) {
          return;
        } else {
          var name = this.state.userFirstNames[user] || user;
          return (
            <div>
              <h4>{name} is a </h4>{" "}
              <Button
                className={event => {
                  if (this.state.responses[user] === "friend") {
                    return "active";
                  }
                }}
                onClick={event => {
                  this.setState({
                    responses: {
                      ...this.state.responses,
                      [user]: "friend"
                    }
                  });
                }}
                variant="outline-primary"
              >
                Friend
              </Button>
              <Button
                className={event => {
                  if (this.state.responses[user] === "flake") {
                    return "active";
                  }
                }}
                onClick={event => {
                  this.setState({
                    responses: {
                      ...this.state.responses,
                      [user]: "flake"
                    }
                  });
                }}
                variant="outline-primary"
              >
                Flake
              </Button>
            </div>
          );
        }
      });
      return (
        <div>
          <h3 className="hd3">Did they show up?</h3>
          <div className="text-muted">{this.state.verify} to respond</div>
          <div>{responses}</div>
          <Button onClick={this.handleSubmitResults} variant="outline-primary">
            Submit
          </Button>
        </div>
      );
    } else {
      return null;
    }
  }
}
export default PactActions;
