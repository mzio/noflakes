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

import { Link } from "react-router-dom";

import "./Login.css";

const popoverTop = (
  <Popover id="popover-positioned-top" title="Username Taken!">
    Don't despair. Just try another one.
  </Popover>
);

function SuccessButton(props) {
  if (props.success()) {
    console.log("Success");
    return <Button onClick={props.btnClick}>Sign me up</Button>;
  } else {
    console.log("failure");
    return (
      <OverlayTrigger trigger="click" placement="top" overlay={popoverTop}>
        <Button>Sign me up</Button>
      </OverlayTrigger>
    );
  }
}

function ModalFail(props) {
  return (
    <Modal
      {...props}
      bsSize="small"
      dialogClassName="LoginModal"
      show={props.success}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton className="ModalStyle">
        <Modal.Title>Username taken or invalid!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="ModalBodyUsername">
        <Row className="show-grid">
          <Col xs={2} md={2} />
          <Col xs={8} md={8}>
            Don't despair. Just try another one. 👍
          </Col>
          <Col xs={2} md={2} />
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      valid: false,
      show: false
    };
    this.getValidationState = this.getValidationState.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.usernameIsValid = this.usernameIsValid.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  usernameIsValid(username) {
    return /^[0-9a-zA-Z]+$/.test(username);
  }

  getValidationState() {
    if (this.usernameIsValid(this.state.username)) {
      fetch("/api/users/" + this.state.username)
        .then(res => res.json())
        .then(json => {
          if (json.data === null) {
            this.setState({ valid: true });
            return true;
          }
        });
      this.setState({ valid: true });
      return true;
    } else {
      return false;
    }
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    if (this.getValidationState()) {
      console.log("Success logging in");
      fetch("/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: this.state.username })
      });
    } else {
      this.handleShow();
    }
    console.log(this.state);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText">
          <Row className="show-grid">
            <Col xs={2} md={4} />
            <Col xs={8} md={4}>
              <h3>Enter a username to sign up!</h3>
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
          Sign up
        </Button>
        <div>
          <Link to="/logout">Take me back home</Link>
        </div>
        <ModalFail success={this.state.show} handleClose={this.handleClose} />
      </form>
    );
  }
}
