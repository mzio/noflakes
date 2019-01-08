import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import ReactDOM from "react-dom";
import { Box, Card, Image, Heading, Text } from "rebass";
import TestTable from "./components/TestTable.js";
// import PactForm from "./components/PactForm.js";

import GoogleLogin from "react-google-login";

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="App">
        <Welcome name="Michael" />
        <h1>It is {this.state.date.toLocaleTimeString()}</h1>
      </div>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign in.</h1>;
}

function Greeting(props) {
  const loggedIn = props.isLoggedIn;
  if (loggedIn) {
    return <UserGreeting />;
  } else {
    return <GuestGreeting />;
  }
}

function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handelLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onclick={this.handleLogoutClick()} />;
    } else {
      button = <LoginButton onclick={this.handleLoginClick()} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function NumberList(props) {
  const numbers = props.numbers;
  const listNumbers = numbers.map(number => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul>{listNumbers}</ul>;
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  } else {
    return <p> The water would not boil.</p>;
  }
}

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
    // this.setState({ temperature: e.target.value })
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: "", scale: "c" };
  }
  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }
  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class App extends Component {
  render() {
    const responseGoogle = response => {
      console.log(response);
    };
    const numbers = [1, 2, 3, 4, 5];
    return (
      <div>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        ;{/* <PactForm /> */}
        <TestTable />
        <Calculator />
        <NameForm />
        <NumberList numbers={numbers} />
        <Greeting isLoggedIn={true} />
        {/* <LoginControl /> */}
        <Clock />
        <Clock />
        <Clock />
        <Toggle />
        <Text fontSize={[3, 4, 5]} fontWeight="bold" color="magenta">
          Text
        </Text>
        <Box
          p={5}
          fontSize={4}
          width={[1, 1, 1 / 2]}
          color="white"
          bg="magenta"
        >
          Box
        </Box>
        <Card
          fontSize={6}
          fontFamily={"Arial"}
          fontWeight={700}
          width={[1, 1, 1 / 2]}
          p={5}
          my={5}
          bg="#f6f6ff"
          borderRadius={8}
          boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
          css="font-family:Arial; fontWeight=bold"
        >
          This is what
        </Card>
        <Heading color="magenta">Hello</Heading>
      </div>
    );
  }
}

export default hot(module)(App);
