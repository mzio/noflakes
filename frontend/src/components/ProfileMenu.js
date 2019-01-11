import React from "react";
import { Link } from "react-router-dom";
import CreatePact from "./CreatePact";
import Profile from "./Profile";
import ViewPacts from "./ViewPacts";
import "./ProfileMenu.css";

function MenuOption(props) {
  // <MenuOption routerLink='/createPact' routerComponent={CreatePact} menuLabel='Create Pact'>
  const routerLink = props.routerLink;
  const routerComponent = props.routerComponent;
  return (
    <div className="MenuOption">
      <h1>
        <span className="FancyClosingL">[ </span>
        <Link
          to={routerLink}
          exact
          component={routerComponent}
          style={{ textDecoration: "none" }}
          user={props.user}
        >
          {props.menuLabel}
        </Link>
        <span className="FancyClosingR"> ]</span>
      </h1>
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
        <MenuOption
          routerLink="/createPact"
          routerComponent={CreatePact}
          menuLabel="Create Pact"
          user={this.props.user}
        />
        <MenuOption
          routerLink="/profile"
          routerComponent={Profile}
          menuLabel="View Profile"
          user={this.props.user}
        />
        <MenuOption
          routerLink="/viewPacts/accepted"
          routerComponent={ViewPacts}
          menuLabel="View Accepted Pacts"
          user={this.props.user}
          mode={"accepted"}
        />
        <MenuOption
          routerLink="/viewPacts/pending"
          routerComponent={ViewPacts}
          menuLabel="View Pending Pacts"
          user={this.props.user}
          mode={"pending"}
        />
        {/* <MenuOption
          routerLink="/profileUser"
          routerComponent={ProfileUser}
          menuLabel="See Profile"
        />
        <MenuOption
          routerLink="/seePacts"
          routerComponent={SeePacts}
          menuLabel="See Pacts"
        /> */}
      </div>
    );
  }
}
