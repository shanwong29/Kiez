import React, { Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ChatArea = props => {
  let neighborId = props.match.params.neighborId;

  let chatAreaMsg = "";
  if (props.chatMsg.length) {
    chatAreaMsg = [...props.chatMsg].reverse().filter(el => {
      return (
        (el.sender._id === props.user._id && el.reciever._id === neighborId) ||
        (el.reciever._id === props.user._id && el.sender._id === neighborId)
      );
    });
  }

  let chatAreaDisplay = [...chatAreaMsg].map((el, index) => {
    let message = el.chatMsg
      .trim()
      .split("\n")
      .map((item, index) => {
        return (
          <span key={index}>
            {item}
            <br />
          </span>
        );
      });

    if (el.sender._id !== props.user._id) {
      return (
        <div key={index} className="d-flex justify-content-start">
          <div className="chat-bubble">
            <b style={{ color: "#66AD93" }}>{el.sender.username}</b>
            <p>{message}</p>
          </div>
        </div>
      );
    }
    return (
      <div key={index} className="d-flex justify-content-end ">
        <div className="chat-bubble">
          <b style={{ color: "#FF8C00" }}>You</b>
          <p>{message}</p>
        </div>
      </div>
    );
  });

  let neighborName = "";
  let neighborPic = "";
  if (chatAreaMsg[0]) {
    if (chatAreaMsg[0].sender.username !== props.user.username) {
      neighborName = chatAreaMsg[0].sender.username;
      neighborPic = chatAreaMsg[0].sender.imageUrl;
    } else {
      neighborName = chatAreaMsg[0].reciever.username;
      neighborPic = chatAreaMsg[0].reciever.imageUrl;
    }
  } else if (chatAreaMsg) {
    let selectedUser = [...props.allUsers].filter(el => {
      return el._id === neighborId;
    });

    neighborName = selectedUser[0].username;
    neighborPic = selectedUser[0].imageUrl;
  }

  return (
    <Fragment>
      <div className="col-9 p-0">
        <div
          className="flex-display-container  px-2 py-2"
          style={{ backgroundColor: "#D5F2E3" }}
        >
          <img
            src={neighborPic}
            width="40"
            height="40"
            className="user-pic"
            alt="neighbor_pic"
          />
          <h3 className="px-2">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/${neighborName}`}
            >
              {neighborName}
            </Link>
          </h3>
        </div>
        <div className="p-4 chat-area-msg-display">{chatAreaDisplay}</div>
        <div>
          <Form
            onSubmit={e => {
              props.handleChatInputSubmit(e, neighborId);
            }}
          >
            <Form.Control
              as="textarea"
              rows="3"
              name="chatInput"
              onChange={props.handleChange}
              value={props.chatInput}
              placeholder="Text here..."
            />
            <div className="d-flex justify-content-end">
              <Button className="mx-2" type="submit" variant="outline-success">
                Send
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatArea;
