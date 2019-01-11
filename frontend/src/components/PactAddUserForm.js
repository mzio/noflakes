import React from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Popover,
  OverlayTrigger,
  Button,
  Modal,
  Row,
  Col
} from "react-bootstrap";

import "./Login.css";

// Import this from external shared file?
function ModalFail(props) {
  return (
    <Modal
      {...props}
      bsSize="small"
      dialogClassName="LoginModal"
      show={props.success}
      onHide={props.handleAddUserClose}
    >
      <Modal.Header closeButton className="ModalStyle">
        <Modal.Title>User doesn't exist!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="ModalBodyUsername">
        <Row className="show-grid">
          <Col xs={2} md={2} />
          <Col xs={8} md={8}>
            Sorry about that. Tell your friends to join! 👍
          </Col>
          <Col xs={2} md={2} />
        </Row>
      </Modal.Body>
    </Modal>
  );
}

// <AddedUsers users={this.state.users} handleDelete={this.deleteUser}/>
class AddedUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users
    };
  }
  render() {
    const { users } = this.props.users;
    if (Array.isArray(users) && users.length === 0) {
      return (
        <div>
          {users.map((user, index) => (
            <div key={index}>
              <h3>{user}</h3>
              <a href="#" id="delete-item" onClick={this.props.handleDelete}>
                Delete
              </a>
            </div>
          ))}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

// <PactAddUserForm submitUsers={this.addUsers} />
export default class PactAddUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      users: [],
      prevAddedUsers: [] // easy retrieval is previously verified
    };
    this.getValidationState = this.getValidationState.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.usernameIsValid = this.usernameIsValid.bind(this);
    this.handleAddUserShow = this.handleAddUserShow.bind(this);
    this.handleAddUserClose = this.handleAddUserClose.bind(this);

    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  usernameIsValid(username) {
    return /^[0-9a-zA-Z]+$/.test(username);
  }

  getValidationState() {
    return new Promise(resolve => {
      if (this.usernameIsValid(this.state.username)) {
        fetch("/api/users/" + this.state.username)
          .then(res => res.json())
          .then(json => {
            console.log(json.data);
            if (json.data === null) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
      } else {
        resolve(false);
      }
    });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  addUser(newUser) {
    var allUsers = this.state.users.concat([newUser]);
    var allPrevUsers = this.state.prevAddedUsers.concat([newUser]);
    this.setState({ users: allUsers });
    this.setState({ prevAddedUsers: allPrevUsers });
  }

  deleteUser(index) {
    existingUsers = this.state.users;
    delete existingUsers[index];
    this.setState({ users: existingUsers });
  }

  handleSubmit(event) {
    if (this.state.prevAddedUsers.includes(this.state.user)) {
      this.addUser(this.state.username);
      this.setState({ username: "" });
    } else {
      this.getValidationState().then(valid => {
        if (valid) {
          this.addUser(this.state.username);
          this.setState({ username: "" });
        } else {
          this.handleAddUserShow();
          this.setState({ username: "" });
        }
      });
    }
  }

  handleSubmitUsers(event) {
    this.props.submitUsers(event);
  }

  handleAddUserClose() {
    this.setState({ show: false });
  }

  handleAddUserShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="formBasicText">
            <Row className="show-grid">
              <Col xs={2} md={4} />
              <Col xs={8} md={4}>
                <h3>Enter usernames of pactholders</h3>
                <FormControl
                  type="text"
                  value={this.state.username}
                  placeholder="Enter username"
                  onChange={this.handleUsernameChange}
                />
              </Col>
              <Col xs={2} md={4} />
            </Row>
          </FormGroup>
          <Button onClick={this.handleSubmit} className="signInButtons">
            Enter User
          </Button>
          <Button onClick={this.handleSubmitUsers} className="signInButtons">
            Submit Pact
          </Button>
          <ModalFail
            success={this.state.show}
            handleAddUserClose={this.handleAddUserClose}
          />
        </form>
        <AddedUsers users={this.state.users} handleDelete={this.deleteUser} />
      </div>
    );
  }
}
