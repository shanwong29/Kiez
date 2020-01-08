import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <p>
          {`\u24B8`} 2019 &nbsp;
          <a
            className="footer-link"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/johanna-geissler/"
            target="_blank"
          >
            <i className="fab fa-linkedin"></i> Hanna Geißler
          </a>
          &nbsp;&nbsp;
          <a
            className="footer-link"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/shanwong29/"
            target="_blank"
          >
            <i className="fab fa-linkedin"></i> Kam Shan Wong
          </a>
        </p>
        <p>
          Full code in our &nbsp;{" "}
          <a
            className="footer-link"
            rel="noopener noreferrer"
            href="https://github.com/shanwong29/Kiez"
            target="_blank"
          >
            <i className="fab fa-github"></i> Github Repository
          </a>
        </p>
      </footer>
    );
  }
}
