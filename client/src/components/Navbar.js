import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { logout } from "../services/auth";
import { Button, Form } from "react-bootstrap";

const Navbar = props => {
  console.log("nav", props);
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
        <div className="searchRow">
          <Form className="input-group btn-group">
            <select
              className="custom-select"
              name="select"
              onChange={props.handleChange}
              value={props.select}
            >
              <option value="">Select Option</option>
              <option value="Neighbors">Find Neighbors</option>
              <option value="Help">Find help</option>
            </select>
            <input
              type="text"
              className="form-control"
              name="searchInput"
              onChange={props.handleChange}
              value={props.searchInput}
            />

            <div className="btn-group">
              <Link to={`/search-result`} variant="outline-secondary">
                Search
              </Link>
            </div>
          </Form>
        </div>
      ) : (
        <React.Fragment />
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
            <Link className="btn btn-outline-info" to="/events/create">
              Create Event
            </Link>
            <Link
              to="/"
              onClick={handleLogout}
              className="btn btn-outline-danger"
            >
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
