import socketIOClient from "socket.io-client";

const endpoint = "http://localhost:5005"; // socket io connection
const socket = socketIOClient(endpoint);

// export const SystemFeedback = (feedback, clear) => {

//     setTimeout(() => {

//         clear('')
//     }, 2000)

//     return feedback
// }

export const socketIn = props => {
  socket.on("message", data => {
    const { type, message } = data;

    if (type === "message") props.getMsg();
    else if (type === "typing") props.setRecieverAction(message);

    // else if (type === 'system') props.setSystemFeedback([...props.systemFeedback, message])
  });
};

export const socketOut = props => {
  const { type, message } = props;

  socket.send({ type, message });
};
