import React from "react";

const ChatArea = props => {
  console.log("CHAT AREA", props);
  console.log("params", props.match.params.neighborId);
  let neighborId = props.match.params.neighborId;
  console.log("current user", props.user._id);
  console.log("chatMsg", props.chatMsg);

  let chatAreaMsg = "";
  if (props.chatMsg) {
    chatAreaMsg = [...props.chatMsg].filter(el => {
      return (
        (el.sender._id === props.user._id && el.reciever._id === neighborId) ||
        (el.reciever._id === props.user._id && el.sender._id === neighborId)
      );
    });
  }

  console.log("chatAreaMsg", chatAreaMsg);
  return <div>dhflkdahflkaskhfdlsa</div>;
};

export default ChatArea;
