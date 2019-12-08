import React, { Fragment, Component } from "react";
import { Button, Alert, Container, Row, Col } from "react-bootstrap";

export default class DeleteButton extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={{ offset: 10 }}>
            <Button
              onClick={this.props.toggleAlertFunction}
              variant="outline-danger"
            >
              {`\u2715`} Delete
            </Button>
          </Col>

          <Col md={{ offset: 6 }}>
            {this.props.showDeleteAlert && (
              <Alert variant="danger">
                {this.props.alertMessage}
                <Button
                  onClick={this.props.deleteFunction}
                  variant="outline-danger"
                >
                  Confirm
                </Button>
                <Button
                  onClick={this.props.toggleAlertFunction}
                  variant="outline-danger"
                >
                  Cancel
                </Button>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

// how to use:
/*
<DeleteButton 
alertMessage ={yr alert msg} 
toggleAlertFunction={function to toggle alert display} 
deleteFunction={axios delete Function}/>
showDeleteAlert={this.state.showDeleteAlert}
*/
