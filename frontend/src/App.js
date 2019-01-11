import React from "react";
import Main from "./components/Main";
import { hot } from "react-hot-loader";

const App = () => (
  <div>
    {/* <TopNav /> */}
    <Main />
  </div>
);

export default hot(module)(App);
