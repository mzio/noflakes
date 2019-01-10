import React from "react";
import { Link } from "react-router-dom";

import "./ProfileMenu.css";

function MenuOption(props) {
  // <MenuOption routerLink='/createPacts' menuLabel='Create Pact'>
  const routerLink = props.routerLink;
  return (
    <div className="MenuOption">
      <span className="FancyClosingL">[</span>
      {props.menuLabel}
      <span className="FancyClosingR">]</span>
    </div>
  );
}

export default class ProfileMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/createPact" exact component={CreatePact}>
            Create Pact
          </Link>
        </div>
        {/* <div>
          <Link to="/activePacts" exact component={CreatePact}>
            Active Pacts
          </Link>
        </div>
        <div>
          <Link to="/pastPacts" exact component={CreatePact}>
            Past Pacts
          </Link>
        </div> */}
      </div>
    );
  }
}
