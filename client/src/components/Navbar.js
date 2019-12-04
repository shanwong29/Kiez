import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { logout } from "../services/auth";

const Navbar = props => {
  const handleLogout = () => {
    // destroys the session on the server
    logout();
    // updates the `user` state in App
    props.clearUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-menu">
      <Link className="navbar-brand" to="/">
        KieZ
      </Link>

      {props.user ? (
        <>
          <div className="searchRow">
            <form
              action="/search"
              method="get"
              className="input-group btn-group"
            >
              <select className="custom-select" name="find">
                <option value="" selected>
                  Select Option
                </option>
                <option value="Neighbors">Find Neighbors</option>
                <option value="Help">Find help</option>
                <option value="Event">Find Events</option>
              </select>
              <input type="text" className="form-control" name="searchInput" />
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-outline-secondary active">
                  <input type="radio" value="1km" checked={true} />1 km
                </label>
                <label className="btn btn-outline-secondary">
                  <input type="radio" value="3km" checked={false} />3 km
                </label>
              </div>
              <div className="btn-group">
                <button className="btn btn-outline-secondary" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <React.Fragment></React.Fragment>
      )}

      <div>
        {props.user ? (
          <>
            <Link
              className="btn btn-outline-success"
              to={`/${props.user.username}`}
            >
              {props.user.username}
            </Link>
            <Link className="btn btn-outline-info" to="">
              Create Event
            </Link>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <React.Fragment>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
