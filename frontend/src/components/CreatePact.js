import React from "react";
import { PageHeader } from "react-bootstrap";
import CreatePactForm from "./CreatePactForm";
import "./CreatePact.css";

export default class CreatePact extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Create a Pact</PageHeader>
        <AssociatedUsers />
        <CreatePactForm />
      </div>
    );
  }
}
