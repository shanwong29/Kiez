import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

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
  let nameOrder = [];

  [...userChatMsg].forEach(el => {
    if (el.sender._id !== props.user._id) {
      navInfo[el.sender.username] = el.chatMsg;
      nameOrder.push(el.sender.username);
    } else {
      navInfo[el.reciever.username] = el.chatMsg;
      nameOrder.push(el.reciever.username);
    }
  });

  console.log("navInfo", navInfo);

  let nameOrderUnique = new Set(nameOrder.reverse());
  console.log(nameOrderUnique);

  let navDisplay = Array.from(nameOrderUnique);

  navDisplay = navDisplay.map((el, index) => {
    let lastMessage = navInfo[el];
    console.log(lastMessage);
    return (
      <NavLink key={index} to="/messenger">
        <strong>{el}</strong>
        <p>{lastMessage}</p>
      </NavLink>
    );
  });

  return <span>{navDisplay}</span>;
};

export default MessengerNav;
