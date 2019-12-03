import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <p>
          &#9400 2019 &nbsp;{" "}
          <a
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/johanna-geissler/"
            target="_blank"
          >
            <i className="fab fa-linkedin"></i> Hanna Geißler
          </a>
          &nbsp; & &nbsp;{" "}
          <a
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/shanwong29/"
            target="_blank"
          >
            <i className="fab fa-linkedin"></i> Kam Shan Wong
          </a>
        </p>
        <p>
          Full code in our &nbsp;{" "}
          <a rel="noopener noreferrer" href="#" target="_blank">
            <i className="fab fa-github"></i> Github Repository
          </a>
        </p>
      </footer>
    );
  }
}
