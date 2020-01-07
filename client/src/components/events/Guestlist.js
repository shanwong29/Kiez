import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

class Guestlist extends Component {
  state = {
    userJoins: null
  };

  handleClick = () => {
    this.setState(
      {
        userJoins: !this.state.userJoins
      },
      () => {
        axios
          .put("/api/events/eventUpdate", {
            event: this.props.event,
            userJoins: this.state.userJoins
          })
          .then(() => {
            this.props.getSingleEvent();
            this.props.getAllEvents();
          });
      }
    );
  };

  componentDidMount = () => {
    const inEvent = this.props.joinedUsers.filter(el => {
      return el._id === this.props.user._id;
    });

    if (inEvent.length) {
      this.setState({ userJoins: true });
    } else {
      this.setState({ userJoins: false });
    }
  };

  render() {
    let isHost = false;
    if (this.props.event.creater._id === this.props.user._id) {
      isHost = true;
    }

    return (
      <>
        <Container>
          <h4>
            Host: {"    "}
            <Link
              to={`/${this.props.event.creater.username}`}
              className="text-decoration-none"
            >
              <img
                className="user-pic"
                width="50"
                height="50"
                src={this.props.event.creater.imageUrl}
                alt={this.props.event.creater.username}
              />{" "}
              <span className="username">
                {this.props.event.creater.username}{" "}
              </span>
            </Link>
          </h4>
          {!isHost && this.props.isFutureEvent && (
            <Button
              variant="light"
              onClick={this.handleClick}
              id={`${this.state.userJoins ? "joined-button" : "join-button"}`}
            >
              {this.state.userJoins ? (
                <i className="fas fa-user-friends"></i>
              ) : (
                <i className="fas fa-user-alt"></i>
              )}{" "}
              {this.state.userJoins ? "Joined" : "Join"}
            </Button>
          )}
          <Row>
            {this.props.joinedUsers.map(el => {
              return (
                <Col xs={2} className="guest" key={el._id}>
                  <Link to={`/${el.username}`} className="text-decoration-none">
                    <img
                      className="user-pic"
                      width="50"
                      height="50"
                      src={el.imageUrl}
                      alt={el.username}
                    />{" "}
                    <p className="username">{el.username}</p>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default Guestlist;
