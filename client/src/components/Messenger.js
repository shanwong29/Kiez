import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import MessengerNav from "./MessengerNav";
import ChatArea from "./ChatArea";

import axios from "axios";
import { SystemFeedback, socketIn, socketOut } from "../socket/socket-io";

// import axios from "axios";

export default class Messenger extends Component {
  // state = {
  // sender: this.props.user._id,
  // reciever: null,
  // chatMsg: null,
  // chatNeighbor: null
  // };

  componentDidMount() {
    console.log("props", this.props);
    // getMsg()
  }

  // handleChange = neighborId => {
  //   this.setState({ chatNeighbor: neighborId });
  // };

  render() {
    return (
      // <div className="list-group">
      <Container fluid={true}>
        {/* <Col xs={5} > */}
        {/* <ListGroup variant="flush"> */}
        <Row>
          <div className="col-3 pr-0">
            <h2>Messenger</h2>
            <div
              className="p-0"
              style={{
                maxHeight: "76vh",
                overflow: "scroll",
                minHeight: "76vh"
              }}
            >
              <MessengerNav
                user={this.props.user}
                chatMsg={this.props.chatMsg}

                // handleChange={this.handleChange}
              />
            </div>
          </div>

          {/* <div
            className="col-9"
            style={{ maxHeight: "80vh", overflow: "scroll" }}
          > */}
          <ChatArea
            user={this.props.user}
            chatMsg={this.props.chatMsg}
            chatInput={this.props.chatInput}
            handleChange={this.props.handleChange}
            handleChatInputSubmit={this.props.handleChatInputSubmit}
            allUsers={this.props.allUsers}
            {...this.props}
          />
          {/* </div> */}
        </Row>

        {/* <div className="col-9">
         
        </div> */}
        {/* </ListGroup> */}
        {/* </Col> */}
      </Container>
      // </div>
    );
  }
}
