import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import MessengerNav from "./MessengerNav";
import ChatArea from "./ChatArea";

// import axios from "axios";
// import { SystemFeedback, socketIn, socketOut } from "../socket/socket-io";

export default class Messenger extends Component {
  componentDidMount() {}

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <div className="col-3 pr-0">
            <h2>Messenger</h2>
            <div className="p-0 messenger-nav">
              <MessengerNav
                user={this.props.user}
                chatMsg={this.props.chatMsg}
              />
            </div>
          </div>

          <ChatArea
            user={this.props.user}
            chatMsg={this.props.chatMsg}
            chatInput={this.props.chatInput}
            handleChange={this.props.handleChange}
            handleChatInputSubmit={this.props.handleChatInputSubmit}
            allUsers={this.props.allUsers}
            {...this.props}
          />
        </Row>
      </Container>
    );
  }
}
