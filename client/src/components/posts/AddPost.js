import axios from "axios";
import React, {Component} from "react";
import {Form, Button, Container, Row, Col} from "react-bootstrap";

class AddPost extends Component {
  state={
    type: "post",
    description: "",
    date: new Date()
  }
}