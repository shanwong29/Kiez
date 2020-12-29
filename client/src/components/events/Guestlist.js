import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

class Guestlist extends Component {
  state = {
    userJoins: null,
  };

  handleClick = () => {
    this.setState(
      {
        userJoins: !this.state.userJoins,
      },
      () => {
        axios
          .put("/api/events/eventUpdate", {
            event: this.props.event,
            userJoins: this.state.userJoins,
          })
          .then(() => {
            this.props.getSingleEvent();
          });
      }
    );
  };

  componentDidMount = () => {
    const inEvent = this.props.joinedUsers.filter((el) => {
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
      <Container id="join-info">
        <h4 className="sub-heading">
          Host: {"    "}
          <Link
            to={`/${this.props.event.creater.username}`}
            className="text-decoration-none"
          >
            <img
              className="user-pic guest-pic"
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
        <Row id="guest-list-row">
          {this.props.joinedUsers.map((el) => {
            return (
              <Col xs={2} md={3} lg={2} className="guest" key={el._id}>
                <Link to={`/${el.username}`} className="text-decoration-none">
                  <img
                    className="user-pic guest-pic"
                    src={el.imageUrl}
                    alt={el.username}
                  />{" "}
                  <p className="username mb-0">{el.username}</p>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Guestlist;
