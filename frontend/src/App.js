import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import ReactDOM from "react-dom";
import { Provider, Box, Card, Subhead, Heading, Text, Button } from "rebass";
import { Hero, CallToAction, ScrollDownIndicator } from "react-landing-page";

class App extends Component {
  render() {
    return (
      <Provider>
        <Hero
          color="black"
          bg="white"
          backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
        >
          <Heading>Name of your app</Heading>
          <Subhead>a couple more words</Subhead>
          {/* <CallToAction href="/getting-started" mt={3}>
            Get Started
          </CallToAction> */}
          <ScrollDownIndicator />
        </Hero>
      </Provider>
    );
  }
}
// const App = props => (
//   <Provider>
//     <Hero
//       color="black"
//       bg="white"
//       backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
//     >
//       <Heading>Name of your app</Heading>
//       <Subhead>a couple more words</Subhead>
//       <CallToAction href="/getting-started" mt={3}>
//         Get Started
//       </CallToAction>
//       <ScrollDownIndicator />
//     </Hero>
//   </Provider>
// );

export default hot(module)(App);
