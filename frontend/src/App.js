import React from "react";
import Main from "./components/Main";
import { hot } from "react-hot-loader";
import NavMenu from "./components/NavMenu/NavMenu";
import SnowStorm from "react-snowstorm";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

const App = () => (
  <div className="App">
    <div>
      {/* <SnowStorm
        snowCharacter="❄️"
        excludeMobile={true}
        animationInterval={40}
      /> */}
    </div>
    <NavMenu />
    <Main />
  </div>
);

export default hot(module)(App);
