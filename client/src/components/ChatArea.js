import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

const ChatArea = (props) => {
  const neighborId = props.neighborId;

  const [newChatNeighborData, setNewChatNeighborData] = useState({
    username: "",
    imageUrl: "",
  });

  let chatAreaMsg = [];
  if (props.chatMsg.length) {
    chatAreaMsg = [...props.chatMsg].reverse().filter((el) => {
      return el.reciever._id === neighborId || el.sender._id === neighborId;
    });
  }

  useEffect(() => {
    if (chatAreaMsg.length <= 0) {
      getSingleUser();
    }
  }, [neighborId]);

  const getSingleUser = () => {
    axios
      .get("/api/user/getUserById", {
        params: {
          id: neighborId,
        },
      })
      .then((response) => {
        const { username, imageUrl } = response.data;
        setNewChatNeighborData({ username, imageUrl });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  } else {
    // when no existing messages with the target neighbor
    neighborName = newChatNeighborData.username;
    neighborPic = newChatNeighborData.imageUrl;
  }

  return (
    <Fragment>
      <div
        className="flex-display-container px-2 py-2"
        style={{
          backgroundColor: "#D5F2E3",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 className="mb-0">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/${neighborName}`}
          >
            <img
              src={neighborPic}
              width="40"
              height="40"
              className="user-pic"
              alt="neighbor_pic"
            />{" "}
            {neighborName}
          </Link>
        </h3>
        {window.innerWidth <= 600 || window.innerHeight <= 600 ? (
          <Button
            id="chat-area-change-size-btn"
            variant="outline-success"
            onClick={props.hideChatArea}
          >
            back to list
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="p-4 chat-area-msg-display">{chatAreaDisplay}</div>
      <div>
        <Form
          onSubmit={(e) => {
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
    </Fragment>
  );
};

export default ChatArea;
