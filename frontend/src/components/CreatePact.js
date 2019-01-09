import React from "react";
import { PageHeader } from "react-bootstrap";
import "./CreatePact.css";

export default class CreatePact extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Create a Pact</PageHeader>
        <AssociatedUsers />
        <PactForm />
      </div>
    );
  }
}
