import React, { Component } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import MessengerNav from "./MessengerNav";

import axios from "axios";

export default class Messenger extends Component {
  state = {
    sender: this.props.user._id,
    reciever: null,
    chatMsg: null
  };

  componentDidMount() {
    console.log("props", this.props);
    this.getMsg();
  }

  getMsg = () => {
    axios
      .get("/api/chat/chat-msg")
      .then(response => {
        this.setState({
          chatMsg: response.data
        });
        console.log("AAA", response);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      // <div className="list-group">
      <Container fluid={true}>
        <Row>
          <Col xs={5}>
            <ListGroup variant="flush">
              <MessengerNav
                user={this.props.user}
                chatMsg={this.state.chatMsg}
              />
            </ListGroup>
          </Col>
        </Row>
      </Container>
      // </div>
    );
  }
}
