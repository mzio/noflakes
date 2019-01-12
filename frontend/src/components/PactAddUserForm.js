import React from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Popover,
  OverlayTrigger,
  Button,
  Modal,
  Container,
  Row,
  Col
} from "react-bootstrap";
import fetch from "isomorphic-fetch";
if (process.env.BROWSER) require("./CreatePact.css");

if (process.env.BROWSER) require("./Login.css");

// Import this from external shared file?
function ModalFailUser(props) {
  return (
    <Modal
      {...props}
      size="small"
      dialogClassName="LoginModal"
      show={props.success}
      onHide={props.handleadduserclose}
    >
      <Modal.Header closeButton className="ModalStyle text-align-center">
        <Modal.Title className="w-100">💔 User doesn't exist! 💔</Modal.Title>
      </Modal.Header>
      <Modal.Body className="ModalBodyUsername">
        <Row className="show-grid">
          <Col xs={2} md={2} />
          <Col xs={8} md={8}>
            Sorry about that. Tell your friends to join!
          </Col>
          <Col xs={2} md={2} />
        </Row>
      </Modal.Body>
    </Modal>
  );
}

function ModalUserAdded(props) {
  return (
    <Modal
      {...props}
      size="small"
      dialogClassName="UserAddedModal"
      show={props.success}
      onHide={props.handleadduserclose}
    >
      <Modal.Header closeButton className="ModalStyle text-align-center">
        <Modal.Title className="w-100">👌 User already added! 👌</Modal.Title>
      </Modal.Header>
      <Modal.Body className="ModalBodyUsername">
        <Row className="show-grid">
          <Col xs={2} md={2} />
          <Col xs={8} md={8}>
            Enter new user or submit pact.
          </Col>
          <Col xs={2} md={2} />
        </Row>
      </Modal.Body>
    </Modal>
  );
}

function UserCard(props) {
  return (
    <Row className="show-grid">
      <Col xs={5} md={3} className="userSubCard">
        <div>Name:</div>
        <h3 className="hd3">{props.name}</h3>
      </Col>
      <Col xs={5} md={3} className="userSubCard">
        <div>Score:</div>
        <h3 className="hd3">{props.score}</h3>
      </Col>
    </Row>
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
    const { users } = this.props;
    if (Array.isArray(users) && users.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <div className="">
            <h3 className="hd3">Added users</h3>
            <p>(including you)</p>
          </div>
          <div>
            {users.map((user, index) => (
              <div key={index}>
                <UserCard name={user} score="undefined" />
                <a
                  href="#"
                  id="delete-item"
                  onClick={() => this.props.handleDelete(user)}
                >
                  Delete
                </a>
              </div>
            ))}
          </div>
        </div>
      );
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
    this.handleAddUserAlreadyShow = this.handleAddUserAlreadyShow.bind(this);
    this.handleAddUserAlreadyClose = this.handleAddUserAlreadyClose.bind(this);

    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        let resData = json.data;
        this.addUser(resData.user.username);
      });
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
            if (json.data !== null) {
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
    try {
      this.setState({ username: event.target.value });
    } catch (err) {
      this.setState({ username: "" });
    }
  }

  addUser(newUser) {
    var allUsers = this.state.users.concat([newUser]);
    var allPrevUsers = this.state.prevAddedUsers.concat([newUser]);
    this.setState({ users: allUsers });
    this.setState({ prevAddedUsers: allPrevUsers });
  }

  deleteUser(event) {
    // let existingUsers = this.state.users;
    // delete existingUsers[index];
    // this.setState({ users: existingUsers });
    var existingUsers = [...this.state.users]; // make a separate copy of the array
    var index = existingUsers.indexOf(event);
    if (index !== -1) {
      existingUsers.splice(index, 1);
      this.setState({ users: existingUsers });
    }
  }

  handleSubmit(event) {
    if (this.state.prevAddedUsers.includes(this.state.user)) {
      this.addUser(this.state.username);
      this.setState({ username: "" });
    } else if (this.state.users.includes(this.state.username)) {
      this.handleAddUserAlreadyShow();
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

  handleAddUserAlreadyClose() {
    this.setState({ showAlready: false });
  }

  handleAddUserAlreadyShow() {
    this.setState({ showAlready: true });
  }

  render() {
    let users = this.state.users;
    return (
      <div>
        <form className="formSubmit">
          <FormGroup controlId="formBasicText">
            <Row className="show-grid">
              <Col xs={2} md={0} />
              <Col xs={12} md={12}>
                <h3 className="hd3">Enter usernames of pactholders</h3>
                <div className="formHelper">
                  When you're done, hit continue.
                </div>
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
          <Button
            onClick={this.handleSubmit}
            className="addUserButton"
            variant="outline-primary"
          >
            Enter User
          </Button>
          <Button
            onClick={() => this.props.submitUsers(users)}
            className="addUserButton"
            variant="outline-primary"
          >
            Continue
          </Button>
          <ModalFailUser
            success={this.state.show}
            handleadduserclose={this.handleAddUserClose}
          />
          <ModalUserAdded
            success={this.state.showAlready}
            handleadduserclose={this.handleAddUserAlreadyClose}
          />
        </form>
        <AddedUsers users={this.state.users} handleDelete={this.deleteUser} />
      </div>
    );
  }
}
