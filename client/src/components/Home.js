import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyEvents from "./events/MyEvents";
import Newsfeed from "./posts/Newsfeed";
import EventsGoing from "./events/EventsGoing";
import NextEvents from "./events/NextEvents";

export default class Home extends Component {
  componentDidMount() {
    this.props.getAllUser();
    this.props.getMsg();
  }

  render() {
    let userChatMsg = "";
    let chatNeighborId = "";
    if (this.props.chatMsg.length) {
      userChatMsg = [...this.props.chatMsg];
      let lastMsg = userChatMsg && userChatMsg[userChatMsg.length - 1];
      if (lastMsg) {
        lastMsg.sender._id !== this.props.user._id
          ? (chatNeighborId = lastMsg.sender._id)
          : (chatNeighborId = lastMsg.reciever._id);
      }
    }

    return (
      <Container id="home">
        <Row className="nested-row">
          <Col md={3} sm={12} className="home-navbar">
            <div style={{ textAlign: "center" }}>
              <img
                src={`${this.props.user.imageUrl}`}
                alt={`${this.props.user.username}`}
                width="150vw"
                height="150vw"
                className="user-pic"
                id="main-page-profile-pic"
              />
            </div>
            <Row>
              <Col md={12} xs={6}>
                {userChatMsg.length > 0 && (
                  <Link
                    to={`/messenger/${chatNeighborId}`}
                    className="btn btn-light home-side-nav"
                    id="home-nav-button4"
                  >
                    <i className="fas fa-envelope"></i> Messenger
                  </Link>
                )}
              </Col>

              <Col md={12} xs={6}>
                <Button
                  className="home-side-nav"
                  id="home-nav-button1"
                  variant="light"
                  onClick={() => {
                    this.props.handleChangeNav({
                      showNewsfeed: false,
                      showMyEvents: true,
                      showEventsGoing: false,
                      showNextEvents: false,
                    });
                  }}
                >
                  My created events
                </Button>
              </Col>

              <Col md={12} xs={6}>
                <Button
                  className="home-side-nav"
                  id="home-nav-button2"
                  variant="light"
                  onClick={() =>
                    this.props.handleChangeNav({
                      showNewsfeed: false,
                      showMyEvents: false,
                      showEventsGoing: true,
                      showNextEvents: false,
                    })
                  }
                >
                  Events I´m joining
                </Button>
              </Col>

              <Col md={12} xs={6}>
                <Button
                  className="home-side-nav"
                  id="home-nav-button3"
                  variant="light"
                  onClick={() => {
                    this.props.handleChangeNav({
                      showNewsfeed: false,
                      showMyEvents: false,
                      showEventsGoing: false,
                      showNextEvents: true,
                    });
                  }}
                >
                  All future events
                </Button>
              </Col>
            </Row>
          </Col>

          <Col md={9} id="newsfeed">
            {this.props.showNewsfeed && <Newsfeed user={this.props.user} />}
            {this.props.showMyEvents && <MyEvents user={this.props.user} />}
            {this.props.showEventsGoing && (
              <EventsGoing user={this.props.user} />
            )}
            {this.props.showNextEvents && <NextEvents user={this.props.user} />}
          </Col>
        </Row>
      </Container>
    );
  }
}
