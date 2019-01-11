import React from "react";

class PactViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.pact.startTime);

    return (
      <a
        href="#"
        class="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h4 class="mb-1">{this.props.pact.name}</h4>
          <small>{this.props.pact.startTime}</small>
        </div>
        <p class="mb-1">{this.props.pact.description}</p>
        <small>{this.props.pact.users.join(", ")}</small>
      </a>
    );
  }
}

export default PactViewer;
