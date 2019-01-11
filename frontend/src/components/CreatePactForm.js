import React from "react";
import {
  Grid,
  Row,
  Col,
  Clearfix,
  FormGroup,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./CreatePact.css";
import { Redirect } from "react-router-dom";
import Home from "./Home";

var moment = require("moment");

export default class CreatePactForm extends React.Component {
  constructor(props) {
    super(props);

    let currentDate = moment();
    let dateString = currentDate.format();
    let endDateString = dateString.slice(0, 10);
    let endTimeString = dateString.slice(10, -6);

    this.state = {
      name: "",
      description: "",
      endDate: endDateString,
      endTime: endTimeString,
      users: props.users
    };
    this.getValidationState = this.getValidationState.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    // this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleEndDateTimeChange = this.handleEndDateTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationState() {
    const nameLength = this.state.name.length;
    const descriptionLength = this.state.description.length;
    const endDateLength = this.state.endDate.length;
    const endTime = this.state.endDate.length;
    if (nameLength < 1 || descriptionLength < 1) return "error";
    else return "success";
  }

  componentDidMount() {
    this.setState({ users: this.props.users });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleEndDateChange(event) {
    this.setState({ endDate: event.target.formattedValue });
  }

  handleEndTimeChange(event) {
    this.setState({ endDate: event.target.value });
  }

  addChars(time) {
    if (time.length < 2) {
      time = "0" + time;
    }
    return time;
  }

  handleEndDateTimeChange(event) {
    // Storing Dates as UTC
    let dateString = event.format();
    let endDateString = dateString.slice(0, 10);
    let endTimeString = dateString.slice(10, -1);
    this.setState({ endDate: endDateString, endTime: endTimeString });
  }

  handleSubmit(event) {
    console.log({
      name: this.state.name,
      description: this.state.description,
      endDate: this.state.endDate + this.state.endTime,
      users: this.state.users
    });
    // Send post request to the backend
    fetch("/api/pacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        endDate: this.state.endDate + "T" + this.state.endTimeString,
        users: this.state.users
      })
    }).then(res => {
      console.log(res);
      return <Redirect to="/" exact component={Home} />;
    });
  }

  render() {
    var lowestDateValue = new Date();
    return (
      <form>
        <FormGroup controlId="formBasicText">
          <FormLabel>Pact Name</FormLabel>
          <FormControl
            type="text"
            value={this.state.name}
            placeholder="How do you want to remember this?"
            onChange={this.handleNameChange}
          />
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <FormLabel>Pact Description</FormLabel>
          <FormControl
            as="textarea"
            placeholder="Describe the pact some more."
            onChange={this.handleDescriptionChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Pact End Date and Time</FormLabel>
          {/* UTC Time */}
          <Datetime
            utc={true}
            defaultValue={lowestDateValue}
            onChange={this.handleEndDateTimeChange}
          />
        </FormGroup>

        <Button
          variant="outline-primary"
          bsSize="large"
          className="SubmitButton"
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </form>
    );
  }
}
