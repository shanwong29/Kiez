import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const MessengerNav = props => {
  console.log("propsNav", props);
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
    // current user is reciever
    if (el.sender._id !== props.user._id) {
      navInfo[el.sender.username] = {
        neighborId: el.sender._id,
        msg: el.chatMsg,
        timeStamp: el.createdAt,
        imageUrl: el.sender.imageUrl
      };
      nameOrder.push(el.sender.username);
    } else {
      // current user is the sender
      navInfo[el.reciever.username] = {
        neighborId: el.sender._id,
        msg: el.chatMsg,
        timeStamp: el.createdAt,
        imageUrl: el.reciever.imageUrl
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
    console.log("me", props.user._id);
    console.log("sender", navInfo[el].neighborId);

    return (
      <NavLink
        key={index}
        to={`/messenger/${navInfo[el].neighborId}`}
        style={{ textDecoration: "none", color: "black" }}
        className="px-2 my-3"
        // activeStyle={{ backgroundColor: "pink" }}
      >
        <div className="msg-select-each-container">
          <div className="pr-2">
            <img
              src={navInfo[el].imageUrl}
              alt="chat-neighbor-pic"
              width="50"
              className="user-pic"
            />
          </div>
          <div>
            <div className="m-0">
              <strong>{el}</strong>{" "}
              <span style={{ color: "grey" }}>
                {`\u2022 ${date} ${month} \u2022`}
              </span>
            </div>
            <div className="m-0">
              {navInfo[el].neighborId === props.user._id ? (
                <span>You: </span>
              ) : (
                <></>
              )}
              <span style={{ color: "grey" }}>{lastMessage}</span>
            </div>
          </div>
        </div>
      </NavLink>
    );
  });

  return <span>{navDisplay}</span>;
};

export default MessengerNav;
