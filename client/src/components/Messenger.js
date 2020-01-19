import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import MessengerNav from "./MessengerNav";
import ChatArea from "./ChatArea";

export default class Messenger extends Component {
  componentDidMount() {}

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <div className="col-3 px-0">
            <MessengerNav user={this.props.user} chatMsg={this.props.chatMsg} />
          </div>

          <div className="col-9 p-0 chat-area-container">
            <ChatArea
              user={this.props.user}
              chatMsg={this.props.chatMsg}
              chatInput={this.props.chatInput}
              handleChange={this.props.handleChange}
              handleChatInputSubmit={this.props.handleChatInputSubmit}
              allUsers={this.props.allUsers}
              {...this.props}
            />
          </div>
        </Row>
      </Container>
    );
  }
}
