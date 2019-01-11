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

import { Link, Redirect } from "react-router-dom";

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
      onHide={props.handleclose}
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

function ModalRetryLogin(props) {
  return (
    <Modal
      {...props}
      bsSize="small"
      dialogClassName="RetryLoginModal"
      show={props.success}
      onHide={props.handleclose}
    >
      <Modal.Header closeButton className="ModalStyle">
        <Modal.Title>Google flaked on us</Modal.Title>
      </Modal.Header>
      <Modal.Body className="ModalBodyUsername">
        <Row className="show-grid">
          <Col xs={2} md={2} />
          <Col xs={8} md={8}>
            Don't despair. Just try logging in again. 👍
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
      show: false,
      redirect: false,
      retryLogin: false,
      showRetryLogin: false
    };
    this.getValidationState = this.getValidationState.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.usernameIsValid = this.usernameIsValid.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowRetryLogin = this.handleShowRetryLogin.bind(this);
    this.handleCloseRetryLogin = this.handleCloseRetryLogin.bind(this);
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

  handleSubmit(event) {
    this.getValidationState().then(valid => {
      if (valid) {
        console.log("Success logging in");
        fetch("/api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: this.state.username })
        })
          .then(res => res.json())
          .then(json => {
            if (json.status === "success") {
              this.setState({ redirect: true });
            } else {
              this.handleShowRetryLogin();
            }
            //
          });
      } else {
        this.handleShow();
      }
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleCloseRetryLogin() {
    this.setState({ showRetryLogin: false });
    this.setState({ retryLogin: true });
  }

  handleShowRetryLogin() {
    this.setState({ showRetryLogin: true });
  }

  render() {
    const { redirect, retryLogin } = this.state;
    if (retryLogin) {
      return <Redirect to="/logout" />;
    } else if (redirect) {
      return <Redirect to="/profile" />;
    }
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
          <a href="/logout">Take me back home</a>
        </div>
        <ModalFail success={this.state.show} handleclose={this.handleClose} />
      </form>
    );
  }
}
