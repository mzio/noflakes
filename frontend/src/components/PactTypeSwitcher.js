import React from "react";
import { Row, Col } from "react-bootstrap";
import { STATES } from "mongoose";
if (process.env.BROWSER) require("./PactTypeSwitcher.css");

export default class PactTypeSwitch extends React.Component {
  constructor(props) {
    super(props);
    console.log("Constructor call");
    console.log(this.props.pactsAccepted);
    this.state = {
      active: "accepted", // accepted or pending
      pactsAccepted: this.props.pactsAccepted,
      pactsPending: this.props.pactsPending
    };
    this.handleClickAccepted = this.handleClickAccepted.bind(this);
    this.handleClickPending = this.handleClickPending.bind(this);
  }

  handleClickAccepted() {
    this.setState({ active: "accepted" });
  }

  handleClickPending() {
    this.setState({ active: "pending" });
  }

  render() {
    var acceptedClass = "Active";
    var pendingClass = "Inactive";
    var displayedPacts;
    if (this.state.active === "accepted") {
      acceptedClass = "Active";
      pendingClass = "Inactive";
      displayedPacts = <div class="list-group">{this.state.pactsAccepted}</div>;
    } else {
      acceptedClass = "Inactive";
      pendingClass = "Active";
      displayedPacts = <div class="list-group">{this.state.pactsPending}</div>;
    }
    console.log(this.state);
    return (
      <div>
        <div style={{ marginBottom: 1 + "rem" }}>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <span className="hd4-option">
                You have {this.props.numAccepted} pacts and{" "}
                {this.props.numPending} pacts.
              </span>
            </Col>
          </Row>
          {/* <Row className="show-grid">
            <Col xs={12} md={5}>
              <a
                href="#"
                onClick={this.handleClickAccepted}
                className={acceptedClass}
              >
                <span className="hd4-option">{this.props.acceptedMessage}</span>
              </a>
            </Col>
            <Col xs={0} md={2} />
            <Col xs={12} md={5}>
              <a
                href="#"
                onClick={this.handleClickPending}
                className={pendingClass}
              >
                <span className="hd4-option">{this.props.pendingMessage}</span>
              </a>
            </Col>
          </Row> */}
        </div>
        {displayedPacts}
      </div>
    );
  }
}
