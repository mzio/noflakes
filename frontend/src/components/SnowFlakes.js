import React from "react";
import Particles from "react-particles-js";

export default class SnowFlakes extends React.Component {
  render() {
    return (
      <Particles
        params={{
          particles: {
            number: {
              value: 42,
              density: {
                enable: true
              }
            },
            shape: {
              type: "images",
              images: [
                {
                  src:
                    "https://commons.wikimedia.org/wiki/File:Emojione_2744.svg",
                  height: 20,
                  width: 20
                }
              ]
            },
            move: {
              random: true,
              speed: 1.5,
              direction: "down",
              out_mode: "out"
            }
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: "repulse"
              }
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 2
              }
            }
          }
        }}
      />
    );
  }
}
