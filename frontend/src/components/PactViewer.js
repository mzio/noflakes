import React from "react";

class PactViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h2>{this.state.pact.name}</h2> 
    <div>{this.state.pact.description}</div>
     <div>{this.state.pact.users.join(", ")}</div>;
  }
}

export default PactViewer;
