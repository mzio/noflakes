import React from "react";
import { Grid, Row, Col, Clearfix, FormGroup } from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

export default class CreatePactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      endDate: "",
      endTime: "",
      users: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({ endDate: event.target.value });
  }

  handleEndTimeChange(event) {
    this.setState({ endDate: event.target.value });
  }

  render() {
    var lowestDateValue = new Date().toISOString();
    return (
      <form>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Pact Name"
          placeholder="Enter Pact Name"
        />
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Pact Description</ControlLabel>
          <FormControl componentClass="textarea" placeholder="textarea" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Pact End Date</ControlLabel>
          <DatePicker id="example-datepicker" minDate={lowestDateValue} />
        </FormGroup>
      </form>
    );
  }
}
