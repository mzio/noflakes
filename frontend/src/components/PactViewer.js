import React from "react";

class PactViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h2>{this.props.pact.name}</h2> 
    <div>{this.props.pact.description}</div>
     <div>{this.props.pact.users.join(", ")}</div>;
  }
}

export default PactViewer;
