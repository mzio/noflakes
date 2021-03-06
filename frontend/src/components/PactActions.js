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
      verify: "start",
      userFirstNames: {},
      responses: {}
    };

    this.timer = null;
    this.refreshVerify = this.refreshVerify.bind(this);
    this.handleSubmitResults = this.handleSubmitResults.bind(this);
    this.handleAcceptPending = this.handleAcceptPending.bind(this);
    this.handleIgnorePending = this.handleIgnorePending.bind(this);
    this.handleFriendClick = this.handleFriendClick.bind(this);
    this.handleFlakeClick = this.handleFlakeClick.bind(this);
  }

  timeUntil(date) {
    var seconds = 86400 + Math.floor((date - new Date()) / 1000);
    if (seconds < 0) {
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
      pending: i >= 0 && this.props.pact.usersStatus[i] === "pending",
      expiry: expiry,
      verify: this.timeUntil(expiry)
    });

    this.timer = setInterval(this.refreshVerify, 1000);
  }

  refreshVerify() {
    this.setState({
      verify: this.timeUntil(this.state.expiry)
    });
    if (!this.state.verify && this.timer) {
      clearInterval(this.timer);
    }
  }

  handleAcceptPending(event) {
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

  handleIgnorePending(event) {
    fetch(
      "/api/pacts/" + this.props.pact._id + "/users/" + this.props.username,
      {
        method: "DELETE"
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
    if (
      Object.values(this.state.responses).length < this.props.pact.users.length
    ) {
      //maybe show modal to describe error
      return;
    } else {
      clearInterval(this.timer);
      this.setState({
        verify: ""
      });
      console.log(this.state.responses);
      Object.keys(this.state.responses).map(username => {
        if (this.state.responses[username] !== "user") {
          fetch("/api/users/" + username + "/score", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              result: this.state.responses[username],
              size: this.props.pact.users.length - 1
            })
          });
        }
      });
      fetch(
        "/api/pacts/" + this.props.pact._id + "/users/" + this.props.username,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status: "inactive" })
        }
      );
    }
  }

  handleFriendClick(user) {
    this.setState({
      responses: {
        ...this.state.responses,
        [user]: "friend"
      }
    });
  }

  handleFlakeClick(user) {
    this.setState({
      responses: {
        ...this.state.responses,
        [user]: "flake"
      }
    });
  }

  render() {
    if (this.state.pending) {
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
    } else if (this.state.verify) {
      var responses = this.props.pact.users.map(user => {
        if (user === this.props.username) {
          return;
        } else {
          var name = this.state.userFirstNames[user] || user;
          var flakeStatus = "";
          var friendStatus = "";
          if (this.state.responses[user] === "friend") {
            friendStatus = "active";
          }
          if (this.state.responses[user] === "flake") {
            flakeStatus = "active";
          }
          return (
            <div>
              <h4>{name} is a </h4>{" "}
              <Button
                className={friendStatus}
                onClick={() => this.handleFriendClick(user)}
                variant="outline-primary"
              >
                Friend
              </Button>
              <Button
                className={flakeStatus}
                onClick={() => this.handleFlakeClick(user)}
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
          <Button
            onClick={this.handleSubmitResults}
            variant="outline-primary"
            className="buttonClick"
          >
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
