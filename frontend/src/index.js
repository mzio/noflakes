import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { ThemeProvider } from "styled-components";
// import TestTable from "./components/TestTable.js";
import theme from "./theme.js";

export default props => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
