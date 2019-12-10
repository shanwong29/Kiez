import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyEvents from "./events/MyEvents";
import Newsfeed from "./events/Newsfeed";
import EventsGoing from "./events/EventsGoing";
import NextEvents from "./events/NextEvents";

export default class Home extends Component {
  // state = {
  //   showNewsfeed: true,
  //   showMyEvents: false,
  //   showEventsGoing: false,
  //   showNextEvents: false
  // };

  // handleClickMyEvents = () => {
  //   this.setState({
  //     showNewsfeed: false,
  //     showMyEvents: true,
  //     showEventsGoing: false,
  //     showNextEvents: false
  //   });
  // };

  // handleClickEventsGoing = () => {
  //   this.setState({
  //     showNewsfeed: false,
  //     showMyEvents: false,
  //     showEventsGoing: true,
  //     showNextEvents: false
  //   });
  // };

  // handleClickNexEvents = () => {
  //   this.setState({
  //     showNewsfeed: false,
  //     showMyEvents: false,
  //     showEventsGoing: false,
  //     showNextEvents: true
  //   });
  // };

  render() {
    console.log(this.props.user);
    return (
      <Container id="home">
        <Row>
          <Col md={3} sm={5} className="home-navbar">
            <img 
              src={`${this.props.user.imageUrl}`}
              alt={`${this.props.user.username}`}
              width="60%"
              className="user-pic home-side-nav"
            />
            <div sm={5}>
              <div>
                <Button className="home-side-nav"
                  onClick={() => {
                    this.props.handleChangeNav({
                      showNewsfeed: false,
                      showMyEvents: true,
                      showEventsGoing: false,
                      showNextEvents: false
                    });
                  }}
                >
                  My events
                </Button>
              </div>
              <div>
                <Button className="home-side-nav"
                  onClick={() =>
                    this.props.handleChangeNav({
                      showNewsfeed: false,
                      showMyEvents: false,
                      showEventsGoing: true,
                      showNextEvents: false
                    })
                  }
                >
                  Events I´m going
                </Button>
              </div>
              <div>
                <Button className="home-side-nav"
                  onClick={() => {
                    this.props.handleChangeNav({
                      showNewsfeed: false,
                      showMyEvents: false,
                      showEventsGoing: false,
                      showNextEvents: true
                    });
                  }}
                >
                  Next events
                </Button>
              </div>
            </div>
          </Col>

          <Col md={9}>
            {this.props.showNewsfeed && <Newsfeed />}
            {this.props.showMyEvents && <MyEvents state={this.props.state} />}
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
