import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
if (process.env.BROWSER) require("./ViewPacts.css");
if (process.env.BROWSER) require("./CreatePact.css");

function ModalPactAction(props) {
  return (
    <Modal
      {...props}
      size="small"
      dialogClassName="PactActionModal"
      show={props.success}
      onHide={props.handleclose}
    >
      <Modal.Header closeButton className="ModalStyle">
        <Modal.Title>👍Pact {this.props.action}! 👍</Modal.Title>
      </Modal.Header>
      <Modal.Body className="ModalBodyUsername">
        <Row className="show-grid">
          <Col xs={2} md={2} />
          <Col xs={8} md={8}>
            Close to return home.
          </Col>
          <Col xs={2} md={2} />
        </Row>
      </Modal.Body>
    </Modal>
  );
}

class PactViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      showModal: false,
      action: "",
      redirect: false
    };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleIgnorePending = this.handleIgnorePending.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleAccept(event) {
    this.setState({ action: "accepted", showModal: true });
    fetch(
      "/api/pacts/" + this.props.pact._id + "/users/" + this.state.username,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "accepted" })
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          this.setState({ show: false });
        }
      });
  }

  handleIgnorePending(event) {
    this.setState({ action: "ignored", showModal: true });
    fetch(
      "/api/pacts/" + this.props.pact._id + "/users/" + this.props.username,
      {
        method: "DELETE"
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          this.setState({ show: false });
        }
      });
  }

  timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  handleClose() {
    this.setState({ redirect: true });
  }

  render() {
    var button;
    var buttonIgnore;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.props.mode === "pending" && this.state.show) {
      button = (
        <Button
          onClick={this.handleAccept}
          className="position-absolute down-right userSubCard"
        >
          Accept
        </Button>
      );
      buttonIgnore = (
        <Button
          onClick={this.handleIgnorePending}
          className="position-absolute down-right userSubCard"
        >
          Ignore
        </Button>
      );
    }
    return (
      <a
        href={"/pact/" + this.props.pact._id}
        className="pactStyle list-group-item list-group-item-action flex-column align-items-start"
      >
        {" "}
        <div className="d-flex w-100 justify-content-between">
          <h5 className="hd4 mb-1">{this.props.pact.name}</h5>
          <small className="text-muted">
            {this.timeSince(new Date(this.props.pact.startTime))} ago
          </small>
        </div>
        <p className="mb-1">{this.props.pact.description}</p>
        <small>
          <i>Users</i>: {this.props.pact.users.join(", ")}
        </small>
        {button} {buttonIgnore}
        <ModalPactAction
          action={this.state.action}
          success={this.state.showModal}
          handleclose={this.handleClose}
        />
      </a>
    );
  }
}

export default PactViewer;
