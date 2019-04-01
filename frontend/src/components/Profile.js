import React from "react";
import fetch from "isomorphic-fetch";
import NotFound from "./NotFound";
if (process.env.BROWSER) require("./Profile.css");
if (process.env.BROWSER) require("./CreatePact.css");

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      user: null
    };
  }

  componentWillMount() {
    if (this.props.match.params.userId) {
      fetch("/api/users/" + this.props.match.params.userId)
        .then(res => res.json())
        .then(json => {
          this.setState({ user: json.data, ready: true });
        });
    } else {
      fetch("/api/auth/user")
        .then(res => res.json())
        .then(json => {
          if (json.data.exists) {
            this.setState({ user: json.data.user, ready: true });
          } else {
            //Handle if user is not logged in
          }
        });
    }
  }

  evaluateScore(scoreString) {
    var score = parseFloat(scoreString);
    var results = [
      <h1>{"THE NOR'EASTER OF THE CENTURY!!!"}</h1>,
      <h2>{"Blizzard Warning!!"}</h2>,
      <h3>{"Mild snow!"}</h3>,
      <h4>{"Flurries."}</h4>,
      <h5>{"A Mystery..."}</h5>,
      <h4>{"On the sunny side."}</h4>,
      <h3>{"Nice and bright!"}</h3>,
      <h2>{"Summer Sunshine!!"}</h2>,
      <h1>{"TOO DAMN HOT!!!"}</h1>
    ];

    if (!isNaN(score)) {
      var category = parseInt(9 * score);
      var size = "" + (450 + 900 * Math.abs(score - 0.5)) + "%";
      // var size = "" + ((4.5 + 9.0 * Math.abs(score - 0.5)) * 3) / 2 + "rem";
      var emoji = "?";
      if (category < 4) {
        emoji = "❄️";
      } else if (category > 5) {
        emoji = "☀️";
      }
      return (
        <div>
          {results[category]}
          <div className="emojiRotate" style={{ fontSize: size }}>
            {emoji}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (!this.state.ready) {
      return <div />;
    } else if (!this.state.user) {
      return <NotFound />;
    } else {
      return (
        <div className="Profile">
          <h1 className="hd2">{this.state.user.firstName}'s Profile</h1>

          <div>
            <h3 className="hd3">Flake Forecast&trade;</h3>
            {this.evaluateScore(this.state.user.score)}
          </div>

          <div className="Details">
            <h3 className="hd4">Details</h3>
            <div>
              <div>
                Name: {this.state.user.firstName} {this.state.user.lastName}
              </div>
              <div>Username: {this.state.user.username}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
