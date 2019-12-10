import React, { Component } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { reverse } from "dns";

const MessengerNav = props => {
  console.log(props);
  let userChatMsg = "";
  if (props.chatMsg) {
    userChatMsg = [...props.chatMsg].filter(el => {
      return (
        el.sender._id === props.user._id || el.reciever._id === props.user._id
      );
    });
  }
  console.log(userChatMsg);

  let navInfo = {};

  let navbarDisplay = [...userChatMsg].forEach(el => {
    if (el.sender._id !== props.user._id) {
      navInfo[el.sender.username] = el.chatMsg;
    } else {
      navInfo[el.reciever.username] = el.chatMsg;
    }
  });

  console.log("navInfo", navInfo);

  // return (
  //   <>
  //     {el.sender._id !== props.user._id ? (
  //       <strong>{el.sender.username}</strong>
  //     ) : (
  //       <strong>{el.reciever.username}</strong>
  //     )}
  //   </>
  // );
  console.log("ddd", navbarDisplay);

  return (
    <div>
      {navbarDisplay}
      <ListGroup.Item as="li" active>
        Cras justo odio
      </ListGroup.Item>
      <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item as="li">Morbi leo risus</ListGroup.Item>
      <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
    </div>
  );
};

export default MessengerNav;
