

<Link to={`/events/${event._id}`} key={event._id} className="event-preview">
              <Container className="event-details">
                <Row>
                  <Col>
                    {/* <img
                    src="../images/flea-market.jpg"
                    height="100%"
                    width="100%"
                    alt=""
                  /> */}
                  </Col>
                  <Col sm={6} className="event-info-container">
                    <h1>{event.name}</h1>
                    <h4>
                      {event.date.slice(0, 10)} at {event.time}
                    </h4>
                    <h4>
                      {event.address.street} {event.address.houseNumber},
                      {event.address.city}
                    </h4>
                    <p>{event.description}</p>
                  </Col>
                </Row>
              </Container>
            </Link>