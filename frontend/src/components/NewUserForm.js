import React from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Popover,
  OverlayTrigger,
  Button
} from "react-bootstrap";

const popoverTop = (
  <Popover id="popover-positioned-top" title="Username Taken!">
    Don't despair. Just try another one.
  </Popover>
);

function SuccessButton(props) {
  if (props.success) {
    return <Button onClick={props.btnClick}>Sign me up</Button>;
  } else {
    return (
      <OverlayTrigger trigger="click" placement="top" overlay={popoverTop}>
        <Button>Sign me up</Button>
      </OverlayTrigger>
    );
  }
}

export default class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      valid: false
    };
    this.getValidationState = this.getValidationState.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.usernameIsValid = this.usernameIsValid.bind(this);
  }

  usernameIsValid(username) {
    return /^[0-9a-zA-Z]+$/.test(username);
  }

  getValidationState() {
    if (this.usernameIsValid(this.state.username)) {
      //   fetch("/api/users/" + this.state.username).then(res =>
      //     res.json().then(json => {
      //       if (json.data === null) {
      //         this.setState({ valid: true });
      //         return true;
      //       }
      //     })
      //   );
      return true;
    } else {
      return false;
    }
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state);
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Enter username:</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="Flakey Boi"
            onChange={this.handleUsernameChange}
          />
        </FormGroup>
        <SuccessButton
          success={this.getValidationState}
          btnClick={this.handleSubmit}
        />
      </form>
    );
  }
}
