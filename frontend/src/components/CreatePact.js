import React from "react";
import { PageHeader } from "react-bootstrap";
import CreatePactForm from "./CreatePactForm";
import PactAddUserForm from "./PactAddUserForm";
import "./CreatePact.css";

export default class CreatePact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersAdded: false,
      users: []
    };
    this.addUsers = this.addUsers.bind(this);
  }
  componentWillMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ users: [json.data.user.username] });
      });
  }

  addUsers(event) {
    this.setState({ users: event });
    this.setState({ usersAdded: true });
  }
  render() {
    if (this.state.usersAdded) {
      // Display pact creation form after users added
      return (
        <div>
          <h3>Create a Pact</h3>
          <CreatePactForm users={this.users} />
        </div>
      );
    } else {
      // Display user add form when first initializing
      return (
        <div>
          <h3>Create a Pact</h3>
          <PactAddUserForm submitUsers={this.addUsers} />
        </div>
      );
    }
  }
}
