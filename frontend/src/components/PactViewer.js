import React from "react";
import { Button } from "react-bootstrap";
if (process.env.BROWSER) require("./ViewPacts.css");
if (process.env.BROWSER) require("./CreatePact.css");

class PactViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.timeSince = this.timeSince.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  }
  handleAccept(event) {
    fetch(
      "/api/pacts/" + this.props.pact._id + "/users/" + this.state.username,
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
          this.setState({ show: false });
        }
      });
  }

  timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

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

  render() {
    var button;
    if (this.props.mode === "pending" && this.state.show) {
      button = (
        <Button
          data-pactid={this.props.pact._id}
          onClick={this.handleAccept}
          className="position-absolute down-right"
        >
          Accept
        </Button>
      );
    }
    return (
      <a
        href="#"
        class="list-group-item list-group-item-action flex-column align-items-start"
        className="pactStyle list-group-item list-group-item-action flex-column align-items-start"
      >
        {" "}
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1" className="hd4">
            {this.props.pact.name}
          </h5>
          <small class="text-muted">
            {this.timeSince(new Date(this.props.pact.startTime))} ago
          </small>
        </div>
        <p class="mb-1">{this.props.pact.description}</p>
        <small>
          <i>Users</i>: {this.props.pact.users.join(", ")}
        </small>
        {button}
      </a>
    );
  }
}

export default PactViewer;
