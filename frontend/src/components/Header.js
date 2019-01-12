import React from "react";

if (process.env.BROWSER) require("./Header.css");
if (process.env.BROWSER) require("./CreatePact.css");

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didScroll: false,
      changeHeaderOn: 100,
      scrollClassName: "cbp-af-header",
      displayText: props.defaultText,
      headerClass: "hd2"
    };
    this.scrollY = this.scrollY.bind(this);
    this.scrollPage = this.scrollPage.bind(this);
  }

  scrollY() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  scrollPage() {
    var sY = this.scrollY();
    if (sY >= this.state.changeHeaderOn) {
      this.setState({
        scrollClassName: "cbp-af-header-shrink",
        displayText: "Noflakes ❄️🚫👌 ",
        headerClass: "hd4-shrink"
      });
    } else {
      this.setState({
        scrollClassName: "cbp-af-header",
        displayText: this.props.defaultText,
        headerClass: "hd2"
      });
    }
    this.setState({ didScroll: false });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollPage);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollPage);
  }

  render() {
    if (this.state.headerClass === "hd2") {
      return (
        <div className="cbp-af-header">
          <div className="cbp-af-inner">
            <div className={this.state.headerClass}>
              {this.state.displayText}
            </div>
            <div className="hd4">{this.props.secondaryText}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="cbp-af-header-shrink">
          <div className="cbp-af-inner">
            <div className={this.state.headerClass}>
              {this.state.displayText}
            </div>
          </div>
        </div>
      );
    }
  }
}
