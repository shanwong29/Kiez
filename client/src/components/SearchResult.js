import React, { Fragment } from "react";
import { distance } from "../../src/services/distance";
import { Container, Row, Col } from "react-bootstrap";

const SearchResult = props => {
  const numberOfItemsDisplay = 5;
  const bigCircle = 3;
  const smallCircle = 1;

  console.log("search resilt", props);
  console.log("search resilt all", props.allUsers);

  let loggedInUserLocation = props.user.address.coordinates;

  let neighbor = "";
  if (props.bigCircle) {
    neighbor = [...props.allUsers].filter(el => {
      let otherUserLocation = el.address.coordinates;

      return (
        distance(loggedInUserLocation, otherUserLocation) <= bigCircle &&
        el.username !== props.user.username
      );
    });
  } else {
    neighbor = [...props.allUsers].filter(el => {
      let otherUserLocation = el.address.coordinates;

      return (
        distance(loggedInUserLocation, otherUserLocation) <= smallCircle &&
        el.username !== props.user.username
      );
    });
  }

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

  let displayService = "";
  let displayOfferStuff = "";

  console.log("1km", neighbor);

  let neighborCards = [...sortedNeighbor].map((el, index) => {
    if (el.offerService) {
      // let service = el.offerService.filter(
      //   el => el.offerService.indexOf(el) < numberOfItemsDisplay
      // );

      // displayService = service.map(el => {
      displayService = el.offerService.map(el => {
        return (
          <Fragment key={index}>
            <span className="mr-2">
              <i class="fas fa-hand-holding-heart"></i> {el}
            </span>
          </Fragment>
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
          <Fragment key={index}>
            <span className="mr-2">
              <i class="fas fa-toolbox"></i> {el}
            </span>
          </Fragment>
        );
      });
    }
    let eachDistance = distance(loggedInUserLocation, el.address.coordinates);
    console.log(eachDistance);
    return (
      <Container key={index} className="p-5">
        <div>
          <img src={el.imageUrl} width="180" className="user-pic" />

          <h6>{eachDistance} km</h6>
          <h6>Credit: {el.credits}</h6>
        </div>
        <div>
          <h1>{el.username}</h1>
          {displayOfferStuff && <h6>I can lend: {displayOfferStuff}</h6>}
          {displayService && <h6>I can help: {displayService}</h6>}
        </div>
      </Container>
    );
  });

  return <div>{neighborCards}</div>;
};

export default SearchResult;
