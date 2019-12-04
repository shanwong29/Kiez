import React, { Component } from "react";
import axios from "axios";

class ProfileDetails extends Component {
  state = {
    profileOwner: "",
    street: "",
    houseNumber: "",
    city: "",
    postalCode: "",
    offerStuff: "",
    offerService: "",
    photo: "",
    aboutMe: "",
    reference: "",
    credit: "",
    event: "",
    following: ""
  };

  getData = () => {
    // get the data from the API
    // update the state accordingly

    const username = this.props.match.params.username;

    axios
      .get(`/api/${username}`)
      .then(response => {
        this.setState(
          {
            username: response.data.username,
            profileOwner: response.data,
            street: response.data.address.street,
            houseNumber: response.data.address.houseNumber,
            city: response.data.address.city,
            postalCode: response.data.address.postalCode,
            offerStuff: response.data.offerStuff,
            offerService: response.data.offerService,
            photo: response.data.photo,
            aboutMe: response.data.aboutMe,
            reference: response.data.reference,
            credits: response.data.credits,
            event: response.data.event,
            following: response.data.following
          },
          () => {
            console.log("state", this.state);
            console.log("res", response.data);
          }
        );
      })
      .catch(err => {
        if (err.response.status === 404) {
          console.log(err.response.data.message);
          this.setState({
            error: err.response.data.message
          });
        }
      });
  };

  componentDidMount() {
    console.log("HERE");
    this.getData();
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    // console.log(this.props.match.params.username);
    // console.log(this.props.allUsers);
    // let profileOwner = "";

    // if (this.props.allUser) {
    //   const profileUsername = this.props.match.params.username;
    //   profileOwner = this.props.allUser.filter(
    //     el => el.username === profileUsername
    //   );

    // console.log(profileOwner);
    //   return <div class="container"></div>;
    // }{
    // if (this.state.error) {
    //   return <div>Error</div>;
    // }
    return <div>Hi</div>;
  }
}

export default ProfileDetails;
// imported in Apps.js
