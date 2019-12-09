import axios from "axios";
import React, { Component } from "react";
import {Link } from "react-router-dom";
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
          <h3>
            Host: {"    "}
            {/* <img src={this.propshost[0].imageUrl} alt={host.username} /> */}
            <img
              className="user-pic"
              width="10%"
              src={this.props.event.creater.imageUrl}
              alt={this.props.event.creater.username}
            />{" "}
            {this.props.event.creater.username}
          </h3>
          {!isHost && (
            <Button onClick={this.handleClick}>
              {this.state.userJoins ? "Unjoin" : "Join"}
            </Button>
          )}
          <Row>
            {this.props.joinedUsers.map(el => {
              return (
                <Col xs={2} className="guest">
                  <Link to={`/${el.username}`}>
                    <img
                      className="user-pic"
                      width="60%"
                      src={el.imageUrl}
                      alt={el.username}
                    />{" "}
                    <p>{el.username}</p>
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
