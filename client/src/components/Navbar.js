import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { logout } from "../services/auth";
import { Button, Form } from "react-bootstrap";

const Navbar = props => {
  const handleLogout = () => {
    // destroys the session on the server
    logout();
    // updates the `user` state in App
    props.clearUser(null);

    props.handleChangeNav({
      showNewsfeed: true,
      showMyEvents: false,
      showEventsGoing: false,
      showNextEvents: false
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-menu py-1">
      <Link className="navbar-brand" to="/">
        <button
          id="logo-button"
          onClick={() =>
            props.handleChangeNav({
              showNewsfeed: true,
              showMyEvents: false,
              showEventsGoing: false,
              showNextEvents: false
            })
          }
        >
          KieZ
        </button>
      </Link>

      {props.user ? (
        <div className="searchRow">
          <Form
            className="input-group btn-group"
            onSubmit={event => props.handleQuery(event, props.history)}
          >
            <select
              className="custom-select"
              name="selectInputfield"
              onChange={props.handleChange}
              value={props.selectInputfield}
            >
              <option value="">Select Option</option>
              <option value="Neighbors">Find by Username</option>
              <option value="Help">Find by Lend-item / Help</option>
            </select>
            <input
              type="text"
              className="form-control"
              name="searchInputfield"
              placeholder="Find your Neighbors here"
              onChange={props.handleChange}
              value={props.searchInputfield}
            />

            <div className="btn-group">
              <Button variant="outline-secondary" type="submit">
                Search
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <React.Fragment />
      )}

      <div className="py-1">
        {props.user ? (
          <>
            <Link
              className="btn btn-outline-success"
              to={`/${props.user.username}`}
            >
              {props.user.username}
            </Link>
            <Link className="btn btn-outline-info mx-3" to="/events/create">
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
            <Link className="btn btn-outline-info mr-3" to="/signup">
              Signup
            </Link>
            <Link className="btn btn-outline-info" to="/login">
              Login
            </Link>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
