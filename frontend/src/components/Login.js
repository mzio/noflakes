import React from "react";
import {
  Popover,
  Modal,
  Button,
  Grid,
  Row,
  Col,
  Clearfix,
  Image
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Model } from "mongoose";
import { Link } from "react-router-dom";
import "./Login.css";

function SocialButton(props) {
  return (
    <Button type="button" className={props.fabStyle} onClick={props.onClick}>
      <span className="faButton">
        <FontAwesomeIcon icon={["fab", `${props.brandName}`]} />
      </span>
      {props.message}
    </Button>
  );
}

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
        <Button
          variant="outline-primary"
          bsSize="large"
          onClick={this.handleShow}
        >
          Sign In
        </Button>

        <Modal
          {...this.props}
          bsSize="small"
          dialogClassName="LoginModal"
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton className="ModalStyle">
            <Modal.Title>
              <div>👋</div>
              ❄️Join Noflakes! ❄️
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="ModalStyle">
            <Row className="show-grid">
              <Col xs={2} md={2} />
              <Col xs={8} md={8}>
                Sign up for Noflakes and make sure no one flakes on you, again!
              </Col>
              <Col xs={2} md={2} />
            </Row>
          </Modal.Body>
          <Modal.Footer className="ModalStyle">
            <div className="signInButtons">
              <a href="/auth/google">
                <SocialButton
                  fabStyle="faGoogle"
                  brandName="google"
                  message="Sign in with Google"
                />
              </a>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
