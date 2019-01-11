import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      user: null
    };
  }

  componentWillMount() {
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        let resData = json.data;
        if (resData.exists) {
          this.setState({ ready: true, user: resData.user });
        } else {
          //Handle if user is not logged in
        }
      });
  }

  render() {
    if (!this.state.ready) {
      return <div />;
    } else {
      return (
        <div class="Profile">
          <h1>{this.state.user.firstName}'s Profile</h1>
          <div>
            Name: {this.state.user.firstName} {this.state.user.lastName}
          </div>
          <div>Username: {this.state.user.username}</div>
          <div>Active Pact Count: {this.state.user.pacts.active.length}</div>
          <div>Past Pact Count: {this.state.user.pacts.inactive.length}</div>
        </div>
      );
    }
  }
}

export default Profile;
