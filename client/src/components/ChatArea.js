import React, { Fragment } from "react";
import { Form, Button } from "react-bootstrap";

const ChatArea = props => {
  console.log("CHAT AREA", props);
  console.log("params", props.match.params.neighborId);
  let neighborId = props.match.params.neighborId;
  console.log("current user", props.user._id);
  console.log("chatMsg////////", props.chatMsg);

  let chatAreaMsg = "";
  if (props.chatMsg.length) {
    chatAreaMsg = [...props.chatMsg].filter(el => {
      return (
        (el.sender._id === props.user._id && el.reciever._id === neighborId) ||
        (el.reciever._id === props.user._id && el.sender._id === neighborId)
      );
    });
  }

  let chatAreaDisplay = [...chatAreaMsg].map((el, index) => {
    return (
      <div key={index}>
        <b>{el.sender.username}</b>

        <p>{el.chatMsg}</p>
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
    console.log(selectedUser);
    console.log(selectedUser[0].username);
    console.log(selectedUser[0].imageUrl);
    neighborName = selectedUser[0].username;
    neighborPic = selectedUser[0].imageUrl;
  }

  console.log("chatAreaMsg", chatAreaMsg);
  return (
    <Fragment>
      <div className="col-9 p-0">
        <div
          className="flex-display-container  px-2 py-2"
          style={{ backgroundColor: "#D5F2E3" }}
        >
          <img src={neighborPic} width="40" height="40" className="user-pic" />
          <h3 className="px-2">{neighborName}</h3>
        </div>
        <div className="p-4" style={{ maxHeight: "50vh", overflow: "scroll" }}>
          {chatAreaDisplay}
        </div>
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
            <Button type="submit" variant="outline-success">
              Send
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatArea;
