import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MessengerNav from "./MessengerNav";
import ChatArea from "./ChatArea";

export default class Messenger extends Component {
  constructor() {
    super();
    this.panelArea = React.createRef();
    this.chatArea = React.createRef();
  }
  componentDidMount() {
    this.props.getMsg();
    if (
      (window.innerWidth <= 600 || window.innerHeight <= 600) &&
      this.props.showChatArea
    ) {
      this.panelArea.current.style.display = "none";
      this.chatArea.current.style.display = "block";
      this.props.setChatArea(false);
    }
  }

  hideChatArea = () => {
    if (window.innerWidth <= 600 || window.innerHeight <= 600) {
      this.panelArea.current.style.display = "block";
      this.chatArea.current.style.display = "none";
    }
  };

  hidePanelArea = () => {
    if (window.innerWidth <= 600 || window.innerHeight <= 600) {
      this.panelArea.current.style.display = "none";
      this.chatArea.current.style.display = "block";
    }
  };

  render() {
    return (
      <Container fluid={true} className="p-0 flex-display-container">
        <div className="px-0 panel-area" ref={this.panelArea}>
          <MessengerNav
            user={this.props.user}
            chatMsg={this.props.chatMsg}
            hidePanelArea={this.hidePanelArea}
          />
        </div>
        <div className="p-0 chat-area-container" ref={this.chatArea}>
          <ChatArea
            user={this.props.user}
            chatMsg={this.props.chatMsg}
            chatInput={this.props.chatInput}
            handleChange={this.props.handleChange}
            handleChatInputSubmit={this.props.handleChatInputSubmit}
            neighborId={this.props.match.params.neighborId}
            hideChatArea={this.hideChatArea}
          />
        </div>
      </Container>
    );
  }
}
