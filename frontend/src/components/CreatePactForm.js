import React from "react";
import { Grid, Row, Col, Clearfix } from "react-bootstrap";

export default class CreatePactForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: ""
    };
  }

  getValidationState() {}
}
