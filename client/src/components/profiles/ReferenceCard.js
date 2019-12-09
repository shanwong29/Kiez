import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const ReferenceCard = props => {
  console.log("Ref Card", props.reference);

  let referenceList = [...props.reference].map((el, index) => {
    let content = el.content.split("\n").map(function(item, key) {
      return (
        <span key={key}>
          {item}
          <br />
        </span>
      );
    });

    let stars = "\u2605".repeat(el.rating);

    return (
      <Fragment key={index}>
        <Row className="my-3">
          <Col className="mr-2" xs={2} lg={1}>
            {el.author.imageUrl && (
              <img
                className="user-pic mt-1"
                src={el.author.imageUrl}
                alt="auth picture"
                width="40"
              />
            )}
          </Col>
          <Col>
            {el.author.username ? (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/${el.author.username}`}
              >
                <strong>{el.author.username}</strong>
              </Link>
            ) : (
              <strong style={{ color: "grey", fontStyle: "italic" }}>
                Deleted
              </strong>
            )}
            <p className="mb-1">{stars}</p>
            <p>{content}</p>
          </Col>
        </Row>
      </Fragment>
    );
  });
  return referenceList;
};

export default ReferenceCard;
