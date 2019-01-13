// Rendering of the About Page
import React from "react";
import SnowStorm from "react-snowstorm";
if (process.env.BROWSER) require("./CreatePact.css");

export default function About(props) {
  return (
    <div>
      <div>{/* <SnowStorm snowCharacter="❄️" /> */}</div>
      <h2 className="hd3">About</h2>
      <p>
        Snowflakes is an app that tries to stop friends from flaking. It's the
        brainchild of two ordinary blockmates and a Harvard dorm room who
        finally decided they had had enough from their flaking friend.
      </p>
      <h2 className="hd3">Special thanks to:</h2>
      <ul>
        <li>
          <a href="https://github.com/burakcan/react-snowstorm">burakcan</a>:
          snowing effect.
        </li>
      </ul>
    </div>
  );
}
