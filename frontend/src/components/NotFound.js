import React from "react";
if (process.env.BROWSER) require("./NotFound.css");

export default () => (
  <div className="NotFound">
    <h3>Sorry, snow page here...</h3>
  </div>
);
