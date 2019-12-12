import axios from "axios";
import React, { Component } from "react";
import { Form, Button, Container, Row, Col} from "react-bootstrap";

class AddComment extends Component {
  state = {
    content: ""
  };

  handleChange = (e) => {
    const content = e.target.value;
    this.setState({
      content: content
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const content = this.state.content;

    axios
    .post(`/api/comments/${this.props.eventId}`, {
      content,
      date: new Date(),
      imageUrl: this.props.user.imageUrl,
      author: this.props.user._id,

    })
    .then(res => console.log("RESPONSE POST:", res))
    .then(this.props.getAllEvents)
    .then(this.setState({content:""}))
    .catch(err => { console.log(err)})
  }

  render() {
    return(
      <div>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Control type="text" as="textarea" rows="3" name="content" onChange={this.handleChange} value={this.state.content} placeholder="write a comment or question"/>        
           
          </Form.Group>
          <Button type="submit">Send</Button>
        </Form>
      </div>
    )
  }

}

export default AddComment;