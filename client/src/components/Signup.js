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

    let username = this.state.username;
    let regex = /^[a-z0-9]+$/i;
    let isValidUserName = regex.test(username);

    let password = this.state.password;

    let street = this.state.street.trim();
    let city = this.state.city.trim();
    let houseNumber = this.state.houseNumber.trim();

    if (!isValidUserName) {
      this.setState({
        error: "Username can contain only english letters or numbers"
      });
      return;
    }

    if (password.length < 8) {
      this.setState({
        error: "Password should contain at least 8 characters"
      });
      return;
    }

    if (!street || !city || !houseNumber) {
      this.setState({
        error:
          "The street, city and house number input should contain valid characters "
      });
      return;
    }

    signup(
      username,
      password,
      street,
      houseNumber,
      city,
      this.state.postalCode
    ).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        this.props.setUser(data);

        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div className="background-image">
        <div className="signup">
          <Container>
            <h2>Signup</h2>

            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Form.Group className="col-6">
                  <Form.Label htmlFor="username">Username: </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required={true}
                  />
                </Form.Group>

                <Form.Group className="col-6">
                  <Form.Label htmlFor="password">Password: </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder="min. 8 characters"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required={true}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="col-8 ">
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

                <Form.Group className="col-4 ">
                  <Form.Label htmlFor="houseNumber">Nr.: </Form.Label>
                  <Form.Control
                    type="text"
                    name="houseNumber"
                    id="houseNumber"
                    onChange={this.handleChange}
                    value={this.state.houseNumber}
                    required={true}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="col-6">
                  <Form.Label htmlFor="postalCode" id="postal-code">
                    Postalcode:{" "}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="postalCode"
                    id="postalCode"
                    onChange={this.handleChange}
                    value={this.state.postalCode}
                    min="0"
                    required={true}
                  />
                </Form.Group>
                <Form.Group className="col-6">
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
              <Button variant="danger" type="submit">
                Sign up
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    );
  }
}

export default Signup;
