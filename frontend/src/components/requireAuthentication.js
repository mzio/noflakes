import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Home from "./Home";

export default ChildComponent => {
  class AuthenticatedComponent extends Component {
    static propTypes = {
      hasAuthToken: PropTypes.bool.isRequired
    };

    render() {
      const { hasAuthToken } = this.props;
      return hasAuthToken ? <ChildComponent {...this.props} /> : <Home />;
    }
  }

  const mapStateToProps = ({ session }) => session;
  return connect(mapStateToProps)(AuthenticatedComponent);
};
