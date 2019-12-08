import React, { Component } from "react";
import { signup } from "../services/auth";
import { Alert, Form, Button, Container, Row, Col } from "react-bootstrap";

class Signup extends Component {
  state = {
    username: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    signup(
      this.state.username,
      this.state.street,
      this.state.houseNumber,
      this.state.city,
      this.state.postalCode,
      this.state.password
    ).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        // no error
        // lift the data up to the App state
        console.log(data);
        this.props.setUser(data);
        ///////////////// setUser is too slow because of coordinates? -> redirect doesn´t work ///////////////////////////////////////

        // redirect to "/"(NewsFeed Page)
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <Container>
        <h2>Signup</h2>

        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Form.Group className="col-2">
              <Form.Label htmlFor="username">Username: </Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="col-3">
              <Form.Label htmlFor="password">Password: </Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="min. 8 characters"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="col-4">
              <Form.Label htmlFor="street">Street: </Form.Label>
              <Form.Control
                type="text"
                name="street"
                id="street"
                value={this.state.street}
                onChange={this.handleChange}
                required={true}
              />
            </Form.Group>

            <Form.Group className="col-1">
              <Form.Label htmlFor="houseNumber">Nr.: </Form.Label>
              <Form.Control
                type="number"
                name="houseNumber"
                id="houseNumber"
                onChange={this.handleChange}
                value={this.state.houseNumber}
                required={true}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="col-2">
              <Form.Label htmlFor="postalCode">Postalcode: </Form.Label>
              <Form.Control
                type="number"
                name="postalCode"
                id="postalCode"
                onChange={this.handleChange}
                value={this.state.postalCode}
                required={true}
              />
            </Form.Group>
            <Form.Group className="col-3">
              <Form.Label htmlFor="city">City: </Form.Label>
              <Form.Control
                type="text"
                name="city"
                id="city"
                onChange={this.handleChange}
                value={this.state.city}
                required={true}
              />
            </Form.Group>
          </Row>

          {this.state.error && (
            <Alert variant="danger">{this.state.error}</Alert>
          )}
          <Button type="submit">Sign up</Button>
        </Form>
      </Container>
    );
  }
}

export default Signup;
