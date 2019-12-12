import React from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddEvent from "./components/events/AddEvent";
import EventDetails from "./components/events/EventDetails";
import MyEvents from "./components/events/MyEvents";
import EventsGoing from "./components/events/EventsGoing";
import SearchResult from "./components/SearchResult";
import Messenger from "./components/Messenger";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfileDetails from "./components/profiles/ProfileDetails";
import Footer from "./components/Footer";
import axios from "axios";
// import { socketIn, socketOut } from "../socket/socket-io";

import socketIOClient from "socket.io-client";

// socket client for new messages
const endpoint = process.env.PORT; //socket
const socket = socketIOClient(endpoint);

class App extends React.Component {
  state = {
    user: this.props.user,
    allUsers: [],
    // filteredUsers: [],
    allEvents: [],
    // filteredEvents: [],
    select: "",
    searchInput: "",
    selectInputfield: "",
    searchInputfield: "",
    showNewsfeed: true,
    showMyEvents: false,
    showEventsGoing: false,
    showNextEvents: false,
    // messenger
    sender: this.props.user._id,
    reciever: "",
    chatMsg: [],
    // chatNeighborId: null
    chatInput: "",
    recieverAction: "",
    imageUrl: ""
  };

  handleChangeNav = object => {
    this.setState(object);
    this.getAllUser();
    this.getAllEvents();
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  setUserPic = imageUrl => {
    this.setState({
      imageUrl
    });
  };
  // setRecieverAction = message => {
  //   this.setState({
  //     recieverAction: message
  //   });
  // };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.getAllUser();
    this.getAllEvents();
    this.getMsg();

    socket.on("message", data => {
      console.log("socket received emitted msg:", data);
      // this.setState({
      //   socketResponse: msg
      // });
      this.getMsg();
    });
  }

  getAllUser = () => {
    axios
      .get("/api/user")
      .then(response => {
        this.setState({
          allUsers: response.data
        });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllEvents = () => {
    axios
      .get("/api/events/myevents")
      .then(response => {
        this.setState({
          allEvents: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getMsg = () => {
    axios
      .get("/api/chat/chat-msg")
      .then(response => {
        this.setState(
          {
            chatMsg: response.data,
            chatInput: ""
            // chatNeighborId: chatNeighborId
          },
          () => console.log("our chat array/////", this.state.chatMsg)
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChatInputSubmit = (e, recieverId) => {
    e.preventDefault();
    if (!this.state.chatInput) {
      return;
    }
    axios
      .post("/api/chat/chat-msg", {
        chatMsg: this.state.chatInput,
        // sender: this.props.user._id,
        reciever: recieverId
      })
      .then(res => {
        socket.send(res.data);
        this.getMsg();
      })
      // .then(() => {
      //   this.setState({ chatMsg: "" });
      // })
      .catch(err => console.log(err));
  };

  // setFilteredUsers = result => {
  //   this.setState({
  //     allUsers: result
  //   });
  // };

  // setFilteredEvents = result => {
  //   this.setState({
  //     allEvents: result
  //   });
  // };

  handleQuery = (e, history) => {
    e.preventDefault();
    if (!this.state.selectInputfield) {
      return;
    }
    this.getAllUser();
    this.setState({
      searchInput: this.state.searchInputfield,
      select: this.state.selectInputfield
    });

    if (history) {
      console.log(history);
      history.push("/search-result");
    }
  };

  render() {
    console.log("USER-INFO:", this.state.user);
    return (
      <div className="App">
        <Route
          render={routerProps => {
            console.log(routerProps);
            return (
              <Navbar
                user={this.state.user}
                clearUser={this.setUser}
                select={this.state.select}
                searchInput={this.state.searchInput}
                selectInputfield={this.state.selectInputfield}
                searchInputfield={this.state.searchInputfield}
                handleChange={this.handleChange}
                handleQuery={this.handleQuery}
                getAllUser={this.getAllUser}
                history={routerProps.history}
                handleChangeNav={this.handleChangeNav}
                showNewsfeed={this.state.showNewsfeed}
                showMyEvents={this.state.showMyEvents}
                showEventsGoing={this.state.showEventsGoing}
                showNextEvents={this.state.showNextEvents}
              />
            );
          }}
        />

        <Switch>
          <Route
            exact
            path="/" //it s Home Page
            render={props => {
              if (this.state.user) {
                return (
                  <Home
                    {...props}
                    user={this.state.user}
                    getAllEvents={this.getAllEvents}
                    allEvents={this.state.allEvents}
                    state={this.state}
                    allEvents={this.state.allEvents}
                    showNewsfeed={this.state.showNewsfeed}
                    showMyEvents={this.state.showMyEvents}
                    showEventsGoing={this.state.showEventsGoing}
                    showNextEvents={this.state.showNextEvents}
                    handleChangeNav={this.handleChangeNav}
                    chatMsg={this.state.chatMsg}
                    imageUrl={this.state.imageUrl}
                  />
                );
              } else {
                return <Redirect to="/signup" />;
              }
            }}
          />

          <Route
            exact
            path="/search-result"
            render={routerProps => (
              <SearchResult
                {...routerProps}
                user={this.state.user}
                allUsers={this.state.allUsers}
                select={this.state.select}
                searchInput={this.state.searchInput}
                // bigCircle={this.state.bigCircle}
              />
            )}
          />

          <Route
            exact
            path="/messenger/:neighborId"
            render={props => (
              <Messenger
                {...props}
                allUsers={this.state.allUsers}
                user={this.state.user}
                chatMsg={this.state.chatMsg}
                chatInput={this.state.chatInput}
                handleChange={this.handleChange}
                handleChatInputSubmit={this.handleChatInputSubmit}
                getMsg={this.getMsg}
                setRecieverAction={this.setRecieverAction}
              />
            )}
          />

          <Route
            exact
            path="/signup"
            render={props => <Signup {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/login"
            render={props => <Login {...props} setUser={this.setUser} />}
          />

          <Route
            exact
            path="/:username"
            render={props => (
              <ProfileDetails
                {...props}
                user={this.state.user}
                allUsers={this.state.allUsers}
                setUserPic={this.setUserPic}
              />
            )}
          />

          <Route
            exact
            path="/events/create"
            render={props => (
              <AddEvent {...props} getAllEvents={this.getAllEvents} />
            )}
          />

          {/* <Route
            exact
            path="/events/myevents"
            render={props => <MyEvents {...props} state={this.state} />}
          /> */}

          {/* <Route
            exact
            path="/events/going"
            render={props => (
              <EventsGoing
                {...props}
                user={this.state.user}
                allEvents={this.state.allEvents}
              />
            )}
          /> */}

          <Route
            exact
            path="/events/:id"
            render={props => (
              <EventDetails
                {...props}
                state={this.state}
                user={this.state.user}
                allUsers={this.state.allUsers}
                getAllEvents={this.getAllEvents}
              />
            )}
          />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default App;
