import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import MessengerNav from "./MessengerNav";
import ChatArea from "./ChatArea";

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
          <div
            className="col-3"
            style={{ maxHeight: "80vh", overflow: "scroll" }}
          >
            <h2>Messenger</h2>
            <MessengerNav
              user={this.props.user}
              chatMsg={this.props.chatMsg}
              // handleChange={this.handleChange}
            />
          </div>

          <div
            className="col-9"
            style={{ maxHeight: "80vh", overflow: "scroll" }}
          >
            <ChatArea
              user={this.props.user}
              chatMsg={this.props.chatMsg}
              chatInput={this.props.chatInput}
              handleChange={this.props.handleChange}
              handleChatInputSubmit={this.props.handleChatInputSubmit}
              {...this.props}
            />
          </div>
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
