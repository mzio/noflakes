import React from "react";
import {
  Grid,
  Row,
  Col,
  Clearfix,
  FormGroup,
  FormControl
} from "react-bootstrap";
// import DatePicker from "react-bootstrap-date-picker";
// import TimePicker from "react-bootstrap-time-picker";
import DateTimeField from "react-bootstrap-datetimepicker";

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
    this.getValidationState = this.getValidationState(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationState() {
    const nameLength = this.state.name.length;
    const descriptionLength = this.state.description.length;
    const endDateLength = this.state.endDate.length;
    const endTime = this.state.endDate.length;
    if (
      nameLength < 1 ||
      descriptionLength < 1 ||
      endDateLength < 1 ||
      endTime < 1
    )
      return "error";
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
    console.log(this.state);
  }

  handleEndDateTimeChange(event) {
    console.log(event);
  }

  render() {
    var lowestDateValue = new Date().toISOString();
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Pact Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            placeholder="Enter pact name"
            onChange={this.handleNameChange}
          />
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Pact Description</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="textarea"
            onChange={this.handleDescriptionChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Pact End Date and Time</ControlLabel>
          {/* <DatePicker
            id="example-datepicker"
            minDate={lowestDateValue}
            onChange={this.handleEndDateChange}
            dateFormat="MM/DD/YYY"
          /> */}
          <DateTimeField
            minDate={lowestDateValue}
            onChange={this.handleEndDateTimeChange}
          />
        </FormGroup>
      </form>
    );
  }
}
