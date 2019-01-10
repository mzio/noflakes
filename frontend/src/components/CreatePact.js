import React from "react";
import { PageHeader } from "react-bootstrap";
import CreatePactForm from "./CreatePactForm";
import "./CreatePact.css";

export default class CreatePact extends React.Component {
  render() {
    return (
      <div>
        <PageHeader className="FormHeader">Create a Pact</PageHeader>
        {/* <CreatePactUsers /> */}
        <CreatePactForm />
      </div>
    );
  }
}
