import React, { Fragment } from "react";
import { distance } from "../../src/services/distance";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchResult = props => {
  const numberOfItemsDisplay = 5;
  const circleSize = 3;
  const smallCircle = 1;

  console.log("search resilt", props);
  console.log("search resilt all", props.allUsers);

  let loggedInUserLocation = props.user.address.coordinates;

  let neighbor = "";

  neighbor = [...props.allUsers].filter(el => {
    let otherUserLocation = el.address.coordinates;

    return (
      distance(loggedInUserLocation, otherUserLocation) <= circleSize &&
      el.username !== props.user.username
    );
  });

  // neighbor = [...props.allUsers].filter(el => {
  //   let otherUserLocation = el.address.coordinates;

  //   return (
  //     distance(loggedInUserLocation, otherUserLocation) <= smallCircle &&
  //     el.username !== props.user.username
  //   );
  // });

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
      return (
        el.offerService.indexOf(searchWord) >= 0 ||
        el.offerStuff.indexOf(searchWord) >= 0
      );
    });
  }

  if (props.select === "Neighbors" && searchWord) {
    sortedNeighbor = sortedNeighbor.filter(el => {
      return el.username.toLowerCase().includes(searchWord.toLowerCase());
    });
  }

  let displayService = "";
  let displayOfferStuff = "";

  console.log("1km", neighbor);

  let neighborCards = [...sortedNeighbor].map((el, index) => {
    if (el.offerService) {
      console.log("HAHAH", el.offerService === true);
      // ***********************************************************************************
      // displayService = el.offerService.filter(
      //   el =>
      //     el.offerService.indexOf(el) < numberOfItemsDisplay &&
      //     el.offerService.indexOf(el) >= 0
      // );

      // displayService = displayService.map(el => {
      // ***********************************************************************************
      displayService = el.offerService.map(el => {
        console.log(typeof el);
        return (
          <Col key={index} xs={6} md={3}>
            <span className="mr-2 help-item ">
              <i className="fas fa-icons"></i>
            </span>
            <span>{el}</span>
          </Col>
        );
      });
    }

    if (el.offerStuff) {
      // let service = el.offerService.filter(
      //   el => el.offerService.indexOf(el) < numberOfItemsDisplay
      // );

      // displayService = service.map(el => {
      displayOfferStuff = el.offerStuff.map((el, index) => {
        return (
          <Col key={index} xs={6} md={3}>
            <span className="mr-2 toolbox">
              <i className="fas fa-toolbox"></i>{" "}
            </span>
            <span>{el}</span>
          </Col>
        );
      });
    }
    let eachDistance = distance(loggedInUserLocation, el.address.coordinates);
    console.log(eachDistance);
    return (
      <Container key={index} className="p-5">
        <Link
          to={`/${el.username}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Row>
            <Col xs={12} md={4}>
              <img src={el.imageUrl} width="180" className="user-pic" />

              <h6>{eachDistance} km</h6>
              <h6>Credit: {el.credits}</h6>
            </Col>
            <Col xs={12} md={8}>
              <h1>{el.username}</h1>
              {displayOfferStuff && (
                <>
                  <h5 className="mt-4" style={{ color: "grey" }}>
                    I can lend:
                  </h5>{" "}
                  <Row>{displayOfferStuff}</Row>
                </>
              )}
              {displayService && (
                <>
                  <h5 className="mt-4" style={{ color: "grey" }}>
                    I can help:{" "}
                  </h5>
                  <Row>{displayService}</Row>
                </>
              )}
            </Col>
          </Row>
        </Link>
      </Container>
    );
  });

  return (
    <>
      <Col md={{ offset: 1 }}>
        <h1 className="p-5">Neighbors around you ( within 3 km )</h1>
      </Col>
      {neighborCards.length > 0 ? (
        <div>{neighborCards}</div>
      ) : (
        <>
          {" "}
          <Col md={{ offset: 1 }}>
            <h3 className="p-5">No Result</h3>
          </Col>
        </>
      )}
    </>
  );
};

export default SearchResult;
