import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";

class Guestlist extends Component {
  state = {
    userJoins: null
    // join: []
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
            console.log("Alles coool");
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
    // const host = this.props.allUsers.findById(this.props.event.creater);
    // console.log(
    //   "ALL USERS:",
    //   this.props.allUsers,
    //   "CREATER ID:",
    //   this.props.event.creater
    // );
    // for (let i = 0; i < this.props.allUsers; i++) {
    //   if (this.props.allUsers[i]._id === this.props.event.creater) {
    //     host = this.props.allUsers[i];
    //   }
    // }
    let isHost = false;
    if (this.props.event.creater._id === this.props.user._id) {
      isHost = true;
    }

    console.log("USER ID LOOK HERE", this.props.user._id);
    console.log("PROPS IN GUESTLIST:", this.props);
    console.log("host-image", this.props.event.creater);
    return (
      <>
        {/* {this.state.userJoins && ( */}
        <Container>
          <h4>
            Host: {"    "}
            <Link
              to={`/${this.props.event.creater.username}`}
              className="text-decoration-none"
            >
              {/* <img src={this.propshost[0].imageUrl} alt={host.username} /> */}
              <img
                className="user-pic"
                width="10%"
                src={this.props.event.creater.imageUrl}
                alt={this.props.event.creater.username}
              />{" "}
              <span className="username">
                {this.props.event.creater.username}{" "}
              </span>
            </Link>
          </h4>
          {!isHost && (
            <Button
              variant="light"
              onClick={this.handleClick}
              id={`${this.state.userJoins ? "joined-button" : "join-button"}`}
            >
              {/* <i class="fas fa-user-friends"></i>{" "} */}
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
                      width="90%"
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
        {/* )} */}
      </>
    );
  }
}

export default Guestlist;
