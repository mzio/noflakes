import React from "react";
import { PageHeader } from "react-bootstrap";
import CreatePactForm from "./CreatePactForm";
import PactAddUserForm from "./PactAddUserForm";
if (process.env.BROWSER) require("./CreatePact.css");
if (process.env.BROWSER) require("../App.css");
import fetch from "isomorphic-fetch";

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
          <h2 className="hd2">Create a Pact</h2>
          <div className="hd2">-------------</div>
          <CreatePactForm users={this.state.users} />
        </div>
      );
    } else {
      // Display user add form when first initializing
      return (
        <div>
          <h2 className="hd2">Create a Pact</h2>
          <div className="hd2">-------------</div>
          <PactAddUserForm submitUsers={this.addUsers} />
        </div>
      );
    }
  }
}
