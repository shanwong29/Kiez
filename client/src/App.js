import React from "react";
import "./App.css";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventPage from "./components/EventPage";
import AddEvent from "./components/events/AddEvent";
import EventDetails from "./components/events/EventDetails";
import EventList from "./components/events/EventList";

import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfileDetails from "./components/profiles/ProfileDetails";
import Footer from "./components/Footer";
import axios from "axios";

class App extends React.Component {
  state = {
    user: this.props.user,
    allUsers: [],
    filteredUsers: [],
    allEvents: [],
    filteredEvents: []
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  componentDidMount() {
    this.getNeighborData();
    this.getAllEvents();
  }

  getNeighborData = () => {
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
       console.log('test')
        this.setState({
          allEvents: response.data
        });
        console.log("ALL EVENTSSSSSSSSS:", response);
      })
      .catch(err => {
        console.log(err);
    });
  };

  setFilteredUsers = result => {
    this.setState({
      allUsers: result
    });
  };

  setFilteredEvents = result => {
    this.setState({
      allEvents: result
    });
  };

  render() {
    console.log("USER-INFO:", this.state.user);
    return (
      <div className="App">
        <Navbar user={this.state.user} clearUser={this.setUser} />
        <Switch>
          <Route
            exact
            path="/" //it s Home Page
            render={props => {
              if (this.state.user) {
                return <EventPage {...props} />;
              } else {
                return <Redirect to="/signup" />;
              }
            }}
          />

          <Route
            exact
            path="/signup"
            // component={Signup}
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
              />
            )}
          />

          <Route
            exact
            path="/events/create"
            render={props => <AddEvent {...props} allEventsSubmit = {this.getAllEvents} />} // user={this.state.user} is already there in props
          />

          <Route exact path="/events/:id" component={EventDetails} />

          <Route
            exact
            path="/events/myevents/:userId"
            render={props => <EventList {...props} state={this.state}  />}
          />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default App;
