import React from "react";
import { Flex, Box } from "@rebass/grid";

class PactForm extends React.Component {
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

  handleSubmit(event) {
    // // This won't work for now
    const apiServer = process.env.PORT;
    const nowDate = new Date();
    const nowTime = nowDate.getHours() + ":" + today.getMinutes()
    // Assumes proxy is set
    // Also assumes endpoint exists
    fetch(/api/postPactEndpoint, {
        method: 'POST',
        body: JSON.stringify({
            name: this.state.name,
            userIds: this.state.users,
            description: this.state.description,
            startTime: nowTime,
            endTime: this.state.endTime
        }),
        headers: {"Content-Type": "application/json"}
    })
    .then(function(response) {
        return response.json()
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input type="text" name="PactName" onChange={this.handleNameChange} />
        </label>
        <label>
          Description
          <textarea
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            name="endDate"
            value={this.state.endDate}
            onChange={this.handleEndDateChange}
          />
        </label>
        <label>
          End Time
          <input
            type="time"
            name="endTime"
            value={this.state.endTime}
            onChange={this.handleEndTimeChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default PactForm;
