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
      navInfo[el.sender.username] = {
        sender: el.sender._id,
        msg: el.chatMsg,
        timeStamp: el.createdAt
      };
      nameOrder.push(el.sender.username);
    } else {
      // current user is the sender
      navInfo[el.reciever.username] = {
        reciever: el.sender._id,
        msg: el.chatMsg,
        timeStamp: el.createdAt
      };
      nameOrder.push(el.reciever.username);
    }
  });

  console.log("navInfo", navInfo);

  let monthEng = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  };

  let nameOrderUnique = new Set(nameOrder.reverse());
  console.log(nameOrderUnique);

  let navDisplay = Array.from(nameOrderUnique);

  navDisplay = navDisplay.map((el, index) => {
    let formattedDate = new Date(navInfo[el].timeStamp);
    let date = formattedDate.getDate();
    let monthNum = formattedDate.getMonth();
    let month = monthEng[monthNum];
    let lastMessage = navInfo[el].msg;
    console.log(lastMessage);
    return (
      <NavLink
        key={index}
        to="/messenger"
        style={{ textDecoration: "none", color: "black" }}
      >
        <p>
          <strong>{el}</strong>{" "}
          <span style={{ color: "grey" }}>
            {date} {month}
          </span>
        </p>
        {navInfo[el].reciever ? <span>You: </span> : <></>}
        <span>{lastMessage}</span>
      </NavLink>
    );
  });

  return <span>{navDisplay}</span>;
};

export default MessengerNav;
