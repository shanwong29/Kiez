import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import AboutMe from "./AboutMe";
import ProfilePic from "./ProfilePic";
import { handleUpload } from "../../services/upload-img";
import OfferService from "./OfferService";
import OfferStuff from "./OfferStuff";
import Reference from "./Reference";
// import DeleteButton from "../DeleteButton";   disable del-account-function temporarily

class ProfileDetails extends Component {
  state = {
    _id: null,
    username: "",
    address: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    offerStuff: "",
    offerService: "",
    imageUrl: "",
    aboutMe: "",
    reference: "",
    credits: "",
    event: "",
    following: "",
    showAboutMeForm: false,
    showAddressForm: false,
    showOfferServiceForm: false,
    showOfferStuffForm: false,
    showReferenceForm: false,
    showReferenceAlert: false,
    showDeleteAlert: false,
    showNotEnoughCredit: false,
    showNeedtoWriteSth: false,
    serviceInput: "",
    stuffInput: "",
    referenceInput: "",
    creditInput: "",
    authorCredits: this.props.user.credits,
    rating: 0,
    photoMessage: null,
    addressInvalidMsg: null,
    canUpdateImg: false,
    originalImgUrl: ""
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getData();
    }
  }

  componentDidMount() {
    this.getData();
  }

  // get profile owner's data and update the state
  getData = () => {
    const username = this.props.match.params.username;

    axios
      .get(`/api/user/${username}`)
      .then(response => {
        this.setState({
          _id: response.data._id,
          username: response.data.username,
          address: response.data.address,
          street: response.data.address.street,
          houseNumber: response.data.address.houseNumber,
          city: response.data.address.city,
          postalCode: response.data.address.postalCode,
          offerStuff: response.data.offerStuff,
          offerService: response.data.offerService,
          imageUrl: response.data.imageUrl,
          aboutMe: response.data.aboutMe,
          reference: response.data.reference.reverse(),
          credits: response.data.credits,
          event: response.data.event,
          following: response.data.following,
          originalImgUrl: response.data.imageUrl
        });
      })

      .catch(err => {
        console.log(err);
        if (err.response.status === 404) {
          this.setState({
            error: err.response.data.message
          });
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleForm = obj => {
    this.setState(obj);
  };

  //Update Address
  updateAddress = event => {
    event.preventDefault();

    let street = this.state.street.trim();
    let city = this.state.city.trim();
    let houseNumber = this.state.houseNumber.trim();
    if (!street || !city || !houseNumber) {
      this.setState({
        addressInvalidMsg:
          "The street, city and house number input should contain valid characters "
      });
      return;
    }

    axios
      .put(`/api/user/address/${this.state.username}`, {
        street: this.state.street,
        houseNumber: this.state.houseNumber,
        city: this.state.city,
        postalCode: this.state.postalCode
      })
      .then(response => {
        this.setState({
          address: response.data.address,
          street: response.data.address.street,
          houseNumber: response.data.address.houseNumber,
          city: response.data.address.city,
          postalCode: response.data.address.postalCode,
          addressInvalidMsg: ""
        });
        this.props.setUser(response.data);
        this.toggleForm({ showAddressForm: !this.state.showAddressForm });
      })
      .catch(err => console.log(err));
  };

  cancelEditAddress = () => {
    this.setState({ showAddressForm: false });
  };

  // AboutMe Functions
  updateAboutMe = event => {
    event.preventDefault();
    axios
      .put(`/api/user/${this.state.username}`, { aboutMe: this.state.aboutMe })
      .then(response => {
        this.setState(
          {
            aboutMe: response.data.aboutMe
          },
          () => {
            this.toggleForm({ showAboutMeForm: !this.state.showAboutMeForm });
          }
        );
      })
      .catch(error => console.log(error));
  };

  cancelEditAboutMe = () => {
    this.getData();
    this.toggleForm({ showAboutMeForm: !this.state.showAboutMeForm });
  };

  // update user's image
  handleFileChange = e => {
    let imgSizeLimit = 5000000; //5MB
    let allowedFormat = ["image/jpeg", "image/png"];
    let chosenFile = e.target.files[0];

    if (!chosenFile) {
      this.setState({
        canUpdateImg: false,
        imageUrl: this.state.originalImgUrl
      });
      return;
    }

    if (chosenFile.size > imgSizeLimit) {
      this.setState({
        canUpdateImg: false,
        photoMessage: "Size of image should be less than 5MB",
        imageUrl: this.state.originalImgUrl
      });
      return;
    }

    if (allowedFormat.indexOf(chosenFile.type) < 0) {
      this.setState({
        canUpdateImg: false,
        photoMessage: "Format of image should be jpeg or png",
        imageUrl: this.state.originalImgUrl
      });
      return;
    }

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route

    this.setState({ uploadOn: true, photoMessage: "" });

    handleUpload(uploadData)
      .then(response => {
        this.setState({
          imageUrl: response.secure_url,
          uploadOn: false,
          canUpdateImg: true,
          photoMessage: ""
        });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmitFile = e => {
    e.preventDefault();

    if (this.state.uploadOn) return; // do nothing if the file is still being uploaded
    axios
      .put(`/api/user/profile-pic/${this.state.username}`, {
        imageUrl: this.state.imageUrl
      })
      .then(response => {
        this.setState({
          imageUrl: response.data.imageUrl,
          photoMessage: "Image has been updated successfully",
          canUpdateImg: false
        });
        this.props.setUser(response.data);
      })
      .catch(error => console.log(error));
  };

  //offer Service functions
  handleSubmitOfferService = e => {
    e.preventDefault();
    if (this.state.serviceInput !== "") {
      axios
        .put(`/api/user/offer-service/${this.state.username}`, {
          offerService: this.state.serviceInput.trim()
        })
        .then(response => {
          this.setState({
            offerService: response.data.offerService,
            serviceInput: ""
          });
        })
        .catch(error => console.log(error));
    }
  };

  deleteService = deleteItem => {
    axios
      .put(`/api/user/offer-service-delete/${this.state.username}`, {
        offerService: deleteItem
      })
      .then(response => {
        this.setState(
          {
            offerService: response.data.OfferService
          },
          () => {
            this.getData();
          }
        );
      })
      .catch(error => console.log(error));
  };

  //offer Stuff functions
  handleSubmitOfferStuff = e => {
    e.preventDefault();
    if (this.state.stuffInput) {
      axios

        .put(`/api/user/offer-stuff/${this.state.username}`, {
          offerStuff: this.state.stuffInput.trim()
        })
        .then(response => {
          this.setState({
            offerStuff: response.data.offerStuff,
            stuffInput: ""
          });
        })
        .catch(error => console.log(error));
    }
  };

  deleteStuff = deleteItem => {
    axios
      .put(`/api/user/offer-stuff-delete/${this.state.username}`, {
        offerStuff: deleteItem
      })
      .then(response => {
        this.setState(
          {
            offerStuff: response.data.offerStuff
          },
          () => {
            this.getData();
          }
        );
      })
      .catch(error => console.log(error));
  };

  // Reference

  handleRefChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      showNeedtoWriteSth: false
    });
  };

  handleCreditChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      showNotEnoughCredit: false
    });
  };

  handleRatingChange = rating => {
    this.setState({
      rating
    });
  };

  cancelEditReference = () => {
    this.toggleForm({ showReferenceAlert: false, showReferenceForm: false });
    this.setState({
      rating: 0,
      referenceInput: "",
      creditInput: "",
      showNotEnoughCredit: false,
      showNeedtoWriteSth: false
    });
  };

  refInfoCheck = e => {
    e.preventDefault();
    if (
      parseInt(this.state.authorCredits, 10) -
        parseInt(this.state.creditInput, 10) <
      0
    ) {
      this.setState({ showNotEnoughCredit: true });
      return;
    }
    if (!this.state.referenceInput) {
      this.setState({ showNeedtoWriteSth: true });
      return;
    }

    this.toggleForm({ showReferenceAlert: true });
  };

  axiosCreateRef = () => {
    return axios
      .post("api/reference", {
        content: this.state.referenceInput,
        author: this.props.user._id,
        rating: this.state.rating,
        profileOwner: this.state._id
      })
      .then(response => {
        console.log(`new ref is created`);
      })
      .catch(err => console.log(err));
  };

  axiosUpdateProfileOwnerCredits = () => {
    return axios
      .put("api/reference/credits/profile-owner", {
        username: this.state.username,
        credits:
          parseInt(this.state.credits, 10) +
          parseInt(this.state.creditInput, 10)
      })
      .then(response => {
        console.log("new profile owner credit: " + response.data.credits);
      })
      .catch(err => console.log(err));
  };

  axiosUpdateAuthorCredits = () => {
    return axios
      .put("api/reference/credits/author", {
        author: this.props.user._id,
        authorCredits:
          parseInt(this.state.authorCredits, 10) -
          parseInt(this.state.creditInput, 10)
      })
      .then(response => {
        this.setState(
          {
            referenceInput: "",
            creditInput: "",
            rating: 0,
            showReferenceAlert: false,
            authorCredits: response.data.credits
          },
          () => {
            this.props.setUser(response.data);
            this.getData();
          }
        );
      })
      .catch(err => console.log(err));
  };

  addReference = () => {
    this.axiosCreateRef()
      .then(() => {
        return this.axiosUpdateProfileOwnerCredits();
      })
      .then(() => {
        return this.axiosUpdateAuthorCredits();
      });
  };

  //Delete Account
  deleteAccount = () => {
    axios
      .delete(`/api/user/${this.state._id}`, { id: this.state._id })
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  toggleDelAlertFunction = () => {
    this.setState({ showDeleteAlert: !this.state.showDeleteAlert });
  };

  render() {
    //  disable del-account-function temporarily
    // let alertMessage = (
    //   <p>
    //     IMPORTANT!! <br />
    //     Are you sure you want to delete your account??
    //   </p>
    // );

    let sameUser = false;
    if (this.state._id === this.props.user._id) {
      sameUser = true;
    }

    if (this.state.error) {
      return <h1 className="profile-detail-page">{this.state.error}</h1>;
    }

    return (
      <Container className="my-md-5 px-lg-5 profile-detail-page">
        {/* disable del-account-function temporarily */}
        {/* {sameUser && (
          <DeleteButton
            alertMessage={alertMessage}
            toggleDelAlertFunction={this.toggleDelAlertFunction}
            deleteFunction={this.deleteAccount}
            showDeleteAlert={this.state.showDeleteAlert}
          />
        )} */}
        <Row>
          <Col md={5} className="my-4" id="profile-left-top-container">
            <ProfilePic
              user={this.props.user}
              sameUser={sameUser}
              imageUrl={this.state.imageUrl}
              handleFileChange={this.handleFileChange}
              handleSubmitFile={this.handleSubmitFile}
              photoMessage={this.state.photoMessage}
              canUpdateImg={this.state.canUpdateImg}
            />

            {sameUser && (
              <>
                <h5
                  style={{ color: "grey" }}
                  className="mt-md-4 profile-detail-subhead"
                >
                  Address&nbsp;&nbsp;&nbsp;
                  {!this.state.showAddressForm && (
                    <Button
                      onClick={() =>
                        this.toggleForm({
                          showAddressForm: !this.state.showAddressForm
                        })
                      }
                      variant="outline-info"
                    >{`\u270E`}</Button>
                  )}
                </h5>

                {this.state.showAddressForm && (
                  <Form onSubmit={this.updateAddress}>
                    <Row>
                      {this.state.addressInvalidMsg && (
                        <p class="warning col-12">
                          * {this.state.addressInvalidMsg}
                        </p>
                      )}

                      <Form.Group className="col-7">
                        <Form.Label htmlFor="street">Street: </Form.Label>
                        <Form.Control
                          type="text"
                          name="street"
                          id="street"
                          value={this.state.street}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </Form.Group>

                      <Form.Group className="col-4">
                        <Form.Label htmlFor="houseNumber">Nr.: </Form.Label>
                        <Form.Control
                          type="text"
                          name="houseNumber"
                          id="houseNumber"
                          onChange={this.handleChange}
                          value={this.state.houseNumber}
                          required={true}
                        />
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group className="col-5">
                        <Form.Label htmlFor="postalCode">
                          Postalcode:{" "}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="postalCode"
                          id="postalCode"
                          onChange={this.handleChange}
                          value={this.state.postalCode}
                          required={true}
                          min="0"
                        />
                      </Form.Group>
                      <Form.Group className="col-6">
                        <Form.Label htmlFor="city">City: </Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          id="city"
                          onChange={this.handleChange}
                          value={this.state.city}
                          required={true}
                        />
                      </Form.Group>
                    </Row>

                    {this.state.error && (
                      <Alert variant="danger">{this.state.error}</Alert>
                    )}

                    <Button
                      variant="outline-success"
                      type="submit"
                      className="mr-2"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={this.cancelEditAddress}
                    >
                      Cancel
                    </Button>
                  </Form>
                )}

                {!this.state.showAddressForm && (
                  <>
                    <p className="mb-0">
                      {this.state.address.formattedAddress}
                    </p>
                    <p
                      className="mb-0"
                      style={{ color: "grey", fontStyle: "italic" }}
                    >
                      * Only you can see your address
                    </p>
                  </>
                )}
              </>
            )}

            <h5
              className="mt-md-4 profile-detail-subhead"
              style={{ color: "grey" }}
            >
              Credit:{" "}
              <span style={{ color: "black" }}>{this.state.credits}</span>
            </h5>
          </Col>

          <Col md={7} className="my-md-4">
            <h1>
              {this.state.username}
              &nbsp;&nbsp;
              {!sameUser && this.props.user && (
                <Link
                  to={`/messenger/${this.state._id}`}
                  className="btn btn-outline-info"
                >
                  {`\u2709`} Message me
                </Link>
              )}
            </h1>

            <AboutMe
              sameUser={sameUser}
              user={this.props.user}
              state={this.state}
              toggleForm={this.toggleForm}
              handleChange={this.handleChange}
              cancelEditAboutMe={this.cancelEditAboutMe}
              updateAboutMe={this.updateAboutMe}
            />
          </Col>

          <Col md={5} id="lend-help-profile-box">
            <OfferStuff
              sameUser={sameUser}
              offerStuff={this.state.offerStuff}
              showOfferStuffForm={this.state.showOfferStuffForm}
              toggleForm={this.toggleForm}
              handleChange={this.handleChange}
              stuffInput={this.state.stuffInput}
              handleSubmitOfferStuff={this.handleSubmitOfferStuff}
              deleteStuff={this.deleteStuff}
            />
            <p className="mt-md-5"></p>
            <OfferService
              sameUser={sameUser}
              offerService={this.state.offerService}
              showOfferServiceForm={this.state.showOfferServiceForm}
              toggleForm={this.toggleForm}
              handleChange={this.handleChange}
              serviceInput={this.state.serviceInput}
              handleSubmitOfferService={this.handleSubmitOfferService}
              deleteService={this.deleteService}
            />
          </Col>
          <Col md={7}>
            <Reference
              sameUser={sameUser}
              user={this.props.user}
              toggleForm={this.toggleForm}
              handleChange={this.handleChange}
              cancelEditReference={this.cancelEditReference}
              refInfoCheck={this.refInfoCheck}
              addReference={this.addReference}
              showReferenceForm={this.state.showReferenceForm}
              showReferenceAlert={this.state.showReferenceAlert}
              rating={this.state.rating}
              referenceInput={this.state.referenceInput}
              creditInput={this.state.creditInput}
              reference={this.state.reference}
              showNotEnoughCredit={this.state.showNotEnoughCredit}
              showNeedtoWriteSth={this.state.showNeedtoWriteSth}
              authorCredits={this.state.authorCredits}
              profileOwner={this.state.username}
              handleRefChange={this.handleRefChange}
              handleCreditChange={this.handleCreditChange}
              handleRatingChange={this.handleRatingChange}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileDetails;
