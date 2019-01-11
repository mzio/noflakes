import React from "react";

class PactViewer extends React.Component {
  constructor(props) {
    super(props);
    this.timeSince = this.timeSince.bind(this);
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
    return [
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{this.props.pact.name}</h5>
        <small class="text-muted">
          {this.timeSince(new Date(this.props.pact.startTime))} ago
        </small>
      </div>,
      <p class="mb-1">{this.props.pact.description}</p>,
      <small>{this.props.pact.users.join(", ")}</small>
    ];
  }
}

export default PactViewer;
