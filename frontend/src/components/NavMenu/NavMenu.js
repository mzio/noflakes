import React from "react";
import { render } from "react-dom";
import Popup from "reactjs-popup";
import BurgerIcon from "./BurgerIcon";
import Menu from "./Menu";
if (process.env.BROWSER) require("./index.css");

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "40px"
};
const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};

export default class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }
  componentWillMount() {
    if (!this.state.signedIn) {
      fetch("/api/auth/user")
        .then(res => res.json())
        .then(json => {
          this.setState({ signedIn: json.data.exists });
          console.log(this.state.signedIn);
          console.log(json.data.exists);
        });
    }
  }
  render() {
    return (
      <div style={styles}>
        <Popup
          modal
          overlayStyle={{ background: "rgba(255,255,255,0.95" }}
          contentStyle={contentStyle}
          closeOnDocumentClick={false}
          trigger={open => <BurgerIcon open={open} />}
        >
          {close => <Menu close={close} signedIn={this.state.signedIn} />}
        </Popup>
      </div>
    );
  }
}
