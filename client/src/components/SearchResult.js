import React from "react";
import { distance } from "../../src/services/distance";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchResult = props => {
  const circleSize = 3;

  let loggedInUserLocation = props.user.address.coordinates;

  let neighbor = "";

  neighbor = [...props.allUsers].filter(el => {
    let otherUserLocation = el.address.coordinates;

    return (
      distance(loggedInUserLocation, otherUserLocation) <= circleSize &&
      el.username !== props.user.username
    );
  });

  let sortedNeighbor = [...neighbor].sort((a, b) => {
    let distanceA = distance(loggedInUserLocation, a.address.coordinates);
    let distanceB = distance(loggedInUserLocation, b.address.coordinates);
    if (distanceA < distanceB) {
      return -1;
    }

    if (distanceA > distanceB) {
      return 1;
    }

    return 0;
  });

  let searchWord = props.searchInput.trim();

  if (props.select === "Help" && searchWord) {
    sortedNeighbor = sortedNeighbor.filter(el => {
      for (const element of el.offerService) {
        if (element.toLowerCase().includes(searchWord.toLowerCase())) {
          return true;
        }
      }

      for (const element of el.offerStuff) {
        if (element.toLowerCase().includes(searchWord.toLowerCase())) {
          return true;
        }
      }

      return false;
    });
  }

  if (props.select === "Neighbors" && searchWord) {
    sortedNeighbor = sortedNeighbor.filter(el => {
      return el.username.toLowerCase().includes(searchWord.toLowerCase());
    });
  }

  let displayService = "";
  let displayOfferStuff = "";

  let neighborCards = [...sortedNeighbor].map((el, index) => {
    if (el.offerService) {
      displayService = el.offerService.map((el, index) => {
        return (
          <Col key={index} xs={6} md={3} className="px-0">
            <span className="help-item">
              <i className="fas fa-icons"></i>{" "}
            </span>
            <span>{el}</span>
          </Col>
        );
      });
    }

    if (el.offerStuff) {
      displayOfferStuff = el.offerStuff.map((el, index) => {
        return (
          <Col key={index} xs={6} md={3} className="px-0">
            <span className="toolbox">
              <i className="fas fa-toolbox"></i>{" "}
            </span>
            <span>{el}</span>
          </Col>
        );
      });
    }
    let eachDistance = distance(loggedInUserLocation, el.address.coordinates);

    return (
      <Container key={index} className="each-neighbor-card">
        <div className="pb-1 pt-2 px-lg-3">
          <Link
            to={`/${el.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Row>
              <Col xs={4} md={2} className="pr-md-0">
                <img
                  src={el.imageUrl}
                  className="user-pic search-result-pic"
                  alt={el.username}
                />
                <div className="flex-space-between">
                  <span className="credit-locat-display">
                    <i className="fas fa-map-marker-alt"></i> {eachDistance} km
                  </span>
                  <span className="credit-locat-display">
                    <i className="far fa-credit-card"></i> {el.credits}
                  </span>
                </div>
              </Col>
              <Col xs={8} md={10} className="pl-md-5 px-0">
                <h4 className="mb-0">{el.username}</h4>
                {displayOfferStuff && (
                  <>
                    <h6
                      className="search-lend-help-title"
                      style={{ color: "grey" }}
                    >
                      I can lend:
                    </h6>{" "}
                    <Row style={{ width: "100%", margin: 0 }}>
                      {displayOfferStuff}
                    </Row>
                  </>
                )}
                {displayService && (
                  <>
                    <h6
                      className="search-lend-help-title"
                      style={{ color: "grey" }}
                    >
                      I can help:{" "}
                    </h6>
                    <Row style={{ width: "100%", margin: 0 }}>
                      {displayService}
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </Link>
        </div>
      </Container>
    );
  });

  return (
    <div id="search-result">
      <h1 className="search-result-heading">
        Neighbors around you (within 3 km)
      </h1>

      {neighborCards.length > 0 ? (
        <div className="neighbor-card">{neighborCards}</div>
      ) : (
        <h3 className="search-result-heading">No Result</h3>
      )}
    </div>
  );
};

export default SearchResult;
