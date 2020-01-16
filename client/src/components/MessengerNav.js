import React from "react";
import { NavLink } from "react-router-dom";

const MessengerNav = props => {
  let userChatMsg = "";
  if (props.chatMsg.length) {
    userChatMsg = [...props.chatMsg].filter(el => {
      return (
        el.sender._id === props.user._id || el.reciever._id === props.user._id
      );
    });
  }

  let navInfo = {};
  let nameOrder = [];

  [...userChatMsg].forEach(el => {
    // current user is reciever
    if (el.sender._id !== props.user._id) {
      navInfo[el.sender.username] = {
        neighborId: el.sender._id,
        sender: el.sender._id,
        msg: el.chatMsg,
        timeStamp: el.createdAt,
        imageUrl: el.sender.imageUrl
      };
      nameOrder.push(el.sender.username);
    } else {
      // current user is the sender
      navInfo[el.reciever.username] = {
        neighborId: el.reciever._id,
        sender: el.sender._id,
        msg: el.chatMsg,
        timeStamp: el.createdAt,
        imageUrl: el.reciever.imageUrl
      };
      nameOrder.push(el.reciever.username);
    }
  });

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

  let navDisplay = Array.from(nameOrderUnique);

  navDisplay = navDisplay.map((el, index) => {
    let formattedDate = new Date(navInfo[el].timeStamp);
    let date = formattedDate.getDate();
    let monthNum = formattedDate.getMonth();
    let month = monthEng[monthNum + 1];
    let lastMessage = navInfo[el].msg.slice(0, 25);

    return (
      <NavLink
        key={index}
        to={`/messenger/${navInfo[el].neighborId}`}
        style={{ textDecoration: "none", color: "black" }}
        className=" message-selector"
      >
        <div className="flex-display-container px-2 py-3">
          <div className="pr-2">
            <img
              src={navInfo[el].imageUrl}
              alt="chat-neighbor-pic"
              width="50"
              height="50"
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
              {navInfo[el].sender === props.user._id ? (
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

  return (
    <>
      <h2>Messenger</h2>
      <div className="p-0 messenger-nav">{navDisplay}</div>
    </>
  );
};

export default MessengerNav;
