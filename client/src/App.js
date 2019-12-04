import React from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewsFeed from "./components/NewsFeed";
import AddEvent from "./components/events/AddEvent";
import EventDetails from "./components/events/EventDetails";

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
    allevents: [],
    filteredEvents: []
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  componentDidMount() {
    this.getNeighborData();
  }

  getNeighborData = () => {
    axios
      .get("/api/users")
      .then(response => {
        this.setState({
          allUsers: response.data
        });
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
    return (
      <Switch>
        <div className="App">
          <Navbar user={this.state.user} clearUser={this.setUser} />

          <Route
            exact
            path="/" //it s Home Page
            render={props => {
              if (this.state.user) {
                return <NewsFeed {...props} />;
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
          render={props => <AddEvent {...props} />} // user={this.state.user} is already there in props
        />

        <Route exact path="/events/:id" component={EventDetails} />

          <Footer />
        </div>
      </Switch>
    );
  }
}

export default App;
