import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MessengerNav from "./MessengerNav";
import ChatArea from "./ChatArea";

import axios from "axios";

export default class Messenger extends Component {
  state = {
    sender: this.props.user._id,
    reciever: null,
    chatMsg: null,
    chatNeighbor: null
  };

  componentDidMount() {
    console.log("props", this.props);
    this.getMsg();
  }

  getMsg = () => {
    axios
      .get("/api/chat/chat-msg")
      .then(response => {
        let chat = response.data[response.data.length - 1];
        let chatNeighbor = "";
        chat.sender !== this.props.user._id
          ? (chatNeighbor = chat.sender)
          : (chatNeighbor = chat.reciever);
        this.setState({
          chatMsg: response.data,
          chatNeighbor: chatNeighbor
        });
        console.log("AAA", this.state.chatNeighbor);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // handleChange = neighborId => {
  //   this.setState({ chatNeighbor: neighborId });
  // };

  render() {
    return (
      // <div className="list-group">
      <Container fluid={true}>
        {/* <Col xs={5} > */}
        {/* <ListGroup variant="flush"> */}
        <div
          className="col-3"
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <h2>Messenger</h2>
          <MessengerNav
            user={this.props.user}
            chatMsg={this.state.chatMsg}
            // handleChange={this.handleChange}
          />
        </div>

        <div className="col-9">
          <ChatArea
            user={this.props.user}
            chatMsg={this.state.chatMsg}
            {...this.props}
          />
        </div>
        {/* </ListGroup> */}
        {/* </Col> */}
      </Container>
      // </div>
    );
  }
}
