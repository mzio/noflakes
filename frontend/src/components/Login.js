import React from "react";
import { Popover, Modal, Button } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import { Model } from "mongoose";

export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        Wow much interactive. Click to sign in!
      </Popover>
    );

    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Sign In
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Join Noflakes!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Sign in to Noflakes and make sure no one ever flakes on you, again!
            <a href="/auth/google">Sign In</a>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
