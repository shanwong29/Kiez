import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyEvents from "./events/MyEvents";
import Newsfeed from "./posts/Newsfeed";
import EventsGoing from "./events/EventsGoing";
import NextEvents from "./events/NextEvents";

export default class Home extends Component {
  render() {
    let userChatMsg = "";
    let chatNeighborId = "";
    if (this.props.chatMsg.length) {
      userChatMsg = [...this.props.chatMsg].filter(el => {
        return (
          el.sender._id === this.props.user._id ||
          el.reciever._id === this.props.user._id
        );
      });
      let lastMsg = userChatMsg && userChatMsg[userChatMsg.length - 1];
      if (lastMsg) {
        lastMsg.sender._id !== this.props.user._id
          ? (chatNeighborId = lastMsg.sender._id)
          : (chatNeighborId = lastMsg.reciever._id);
      }
    }

    return (
      <Container id="home">
        <Row>
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
                      showNextEvents: false
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
                      showNextEvents: false
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
                      showNextEvents: true
                    });
                  }}
                >
                  All future events
                </Button>
              </Col>
            </Row>
          </Col>

          <Col md={9} id="newsfeed">
            {this.props.showNewsfeed && (
              <Newsfeed
                user={this.props.user}
                allEvents={this.props.allEvents}
                getAllEvents={this.props.getAllEvents}
              />
            )}
            {this.props.showMyEvents && (
              <MyEvents state={this.props.state} user={this.props.user} />
            )}
            {this.props.showEventsGoing && (
              <EventsGoing
                user={this.props.user}
                allEvents={this.props.allEvents}
              />
            )}
            {this.props.showNextEvents && (
              <NextEvents state={this.props.state} user={this.props.user} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
