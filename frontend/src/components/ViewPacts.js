import React from "react";
import PactViewer from "./PactViewer";
import { Button } from "react-bootstrap";

class ViewPacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userReady: false,
      user: null,
      pacts: [],
      show: {}
    };
    this.handleAccept = this.handleAccept.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    console.log(this.state);
    fetch("/api/auth/user")
      .then(res => res.json())
      .then(json => {
        if (json.data.exists) {
          this.setState({ user: json.data.user, userReady: true });
          for (
            var i = 0;
            i < json.data.user.pacts[this.props.mode].length;
            ++i
          ) {
            let pactId = json.data.user.pacts[this.props.mode][i];
            fetch("/api/pacts/" + pactId)
              .then(res => res.json())
              .then(json => {
                if (json.status === "success") {
                  this.setState({
                    pacts: this.state.pacts.concat([json.data])
                  });
                  var newShow = this.state.show;
                  newShow[json.data._id] = true;
                  this.setState({
                    show: newShow
                  });
                }
              });
          }
        } else {
          //Handle if user is not logged in
        }
      });
  }

  handleAccept(event) {
    let id = event.target.getAttribute("data-pactid");
    console.log(id);
    fetch("/api/pacts/" + id + "/users/" + this.state.user.username, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "accepted" })
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          var newShow = this.state.show;
          newShow[id] = false;
          this.setState({ show: newShow });
        }
      });
  }

  render() {
    if (!this.state.userReady) {
      return <div />;
    } else {
      var pacts = this.state.pacts.map(pact => {
        let button;
        if (this.props.mode === "pending") {
          button = (
            <Button data-pactid={pact._id} onClick={this.handleAccept}>
              Accept
            </Button>
          );
        }
        if (this.state.show[pact._id]) {
          return (
            <a
              href="#"
              class="list-group-item list-group-item-action flex-column align-items-start"
            >
              <PactViewer pact={pact} />
              {button}
            </a>
          );
        } else {
          return;
        }
      });

      return (
        <div class="Pacts">
          <h1>
            {this.state.user.firstName}'s{" "}
            {this.props.mode.charAt(0).toUpperCase() +
              this.props.mode.toLowerCase().slice(1)}{" "}
            Pacts
          </h1>
          <div class="list-group">{pacts}</div>
        </div>
      );
    }
  }
}

export default ViewPacts;
