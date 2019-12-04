import React from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddEvent from "./components/events/AddEvent";
import EventDetails from "./components/events/EventDetails";

import Signup from "./components/Signup";
import Login from "./components/Login";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} clearUser={this.setUser} />

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
          path="/events/create"
          render={props => <AddEvent {...props} />} // user={this.state.user} is already there in props
        />

        <Route exact path="/events/:id" component={EventDetails} />
      </div>
    );
  }
}

export default App;
