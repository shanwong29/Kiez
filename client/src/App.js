import React from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddEvent from "./components/events/AddEvent";
import EventDetails from "./components/events/EventDetails";
import SearchResult from "./components/SearchResult";
import Messenger from "./components/Messenger";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfileDetails from "./components/profiles/ProfileDetails";
import Footer from "./components/Footer";
import axios from "axios";

import socketIOClient from "socket.io-client";

// socket client for new messages
const endpoint = process.env.PORT; //socket
const socket = socketIOClient(endpoint);

class App extends React.Component {
  state = {
    user: this.props.user,
    allUsers: [],
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
    chatInput: "",
    recieverAction: "",
    showChatArea: false,
  };

  setChatArea = (setValue) => {
    this.setState({ showChatArea: setValue });
  };

  handleChangeNav = (object) => {
    this.setState(object);
    this.getAllUser();
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    socket.on("message", (data) => {
      this.getMsg();
    });
  }
  getAllUser = () => {
    axios
      .get("/api/user")
      .then((response) => {
        this.setState({
          allUsers: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getMsg = () => {
    axios
      .get("/api/chat/chat-msg")
      .then((response) => {
        this.setState({
          chatMsg: response.data,
          chatInput: "",
        });
      })
      .catch((err) => {
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
        reciever: recieverId,
      })
      .then((res) => {
        socket.send(res.data);
        this.getMsg();
      })

      .catch((err) => console.log(err));
  };

  handleQuery = (e, history) => {
    e.preventDefault();
    if (!this.state.selectInputfield) {
      return;
    }
    this.getAllUser();
    this.setState({
      searchInput: this.state.searchInputfield,
      select: this.state.selectInputfield,
    });

    if (history) {
      history.push("/search-result");
    }
  };

  render() {
    return (
      <div className="App">
        <Route
          render={(routerProps) => {
            // console.log(routerProps);
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
            render={(props) => {
              if (this.state.user) {
                return (
                  <Home
                    {...props}
                    user={this.state.user}
                    state={this.state}
                    showNewsfeed={this.state.showNewsfeed}
                    showMyEvents={this.state.showMyEvents}
                    showEventsGoing={this.state.showEventsGoing}
                    showNextEvents={this.state.showNextEvents}
                    handleChangeNav={this.handleChangeNav}
                    getAllUser={this.getAllUser}
                    getMsg={this.getMsg}
                    chatMsg={this.state.chatMsg}
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
            render={(routerProps) => {
              if (this.state.user) {
                return (
                  <SearchResult
                    {...routerProps}
                    user={this.state.user}
                    allUsers={this.state.allUsers}
                    select={this.state.select}
                    searchInput={this.state.searchInput}
                  />
                );
              } else {
                return <Redirect to="/signup" />;
              }
            }}
          />

          <Route
            exact
            path="/messenger/:neighborId"
            render={(props) => {
              if (this.state.user) {
                return (
                  <Messenger
                    {...props}
                    allUsers={this.state.allUsers}
                    user={this.state.user}
                    chatMsg={this.state.chatMsg}
                    chatInput={this.state.chatInput}
                    handleChange={this.handleChange}
                    handleChatInputSubmit={this.handleChatInputSubmit}
                    setRecieverAction={this.setRecieverAction}
                    setChatArea={this.setChatArea}
                    showChatArea={this.state.showChatArea}
                  />
                );
              } else {
                return <Redirect to="/signup" />;
              }
            }}
          />

          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setUser={this.setUser} />}
          />

          <Route
            exact
            path="/:username"
            render={(props) => {
              if (this.state.user) {
                return (
                  <ProfileDetails
                    {...props}
                    user={this.state.user}
                    allUsers={this.state.allUsers}
                    setUser={this.setUser}
                    setChatArea={this.setChatArea}
                  />
                );
              } else {
                return <Redirect to="/signup" />;
              }
            }}
          />

          <Route
            exact
            path="/events/create"
            render={(props) => {
              if (this.state.user) {
                return <AddEvent {...props} />;
              } else {
                return <Redirect to="/signup" />;
              }
            }}
          />

          <Route
            exact
            path="/events/:id"
            render={(props) => (
              <EventDetails
                {...props}
                state={this.state}
                user={this.state.user}
                allUsers={this.state.allUsers}
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
