const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Reference = require("../models/Reference");

////////////////////////////////////////////////////////////

//const geocoder = require("geocoder");
const geocoder = require("google-geocoder");
let geo = geocoder({
  key: process.env.geocodeKey
});
///////////////////////////////////////////////////////////

geolocation = (street, houseNumber, postalCode, city) => {
  return new Promise((resolve, reject) => {
    geo.find(`${street} ${houseNumber}, ${postalCode} ${city}`, (err, res) => {
      if (err) return reject(err);
      resolve(res[0]);
    });
  });
};
/////////////////////////////////////////////////////////

// return all users
router.get("/", (req, res) => {
  Users.find({})
    .populate({
      path: "reference",
      /* path is key of the data-field from the User Model */
      // ^^^populates the `reference` field in the User Model

      populate: {
        path: "author"
        // model: "User"
        // populates the `author` field in the User Model
      }
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// return one user
router.get("/:username", (req, res) => {
  Users.findOne({ username: req.params.username })
    .populate({
      path: "reference",

      populate: {
        path: "author"
      }
    })
    .then(doc => {
      if (!doc) {
        res.status(404).json({ message: "This user does not exist" });
      } else res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//update about me
router.put("/:username", (req, res) => {
  let user = req.params.username;
  let aboutMe = req.body.aboutMe;
  // let aboutMe = req.body.aboutMe;

  Users.findOneAndUpdate(
    { username: user },
    { aboutMe: aboutMe },
    { new: true }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//update address
router.put("/address/:username", (req, res) => {
  let user = req.params.username;
  let street = req.body.street;
  let houseNumber = req.body.houseNumber;
  let city = req.body.city;
  let postalCode = req.body.postalCode;

  geolocation(street, houseNumber, postalCode, city).then(geocodeData => {
    Users.findOneAndUpdate(
      { username: user },
      {
        address: {
          street: street,
          houseNumber: houseNumber,
          city: city,
          postalCode: postalCode,
          coordinates: geocodeData.location,
          formattedAddress: geocodeData.formatted_address
        }
      },
      { new: true }
    )
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
});

// update profile pic
router.put("/profile-pic/:username", (req, res) => {
  let user = req.params.username;

  Users.findOneAndUpdate(
    { username: user },
    { imageUrl: req.body.imageUrl },
    { new: true }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update offer service
router.put("/offer-service/:username", (req, res) => {
  let user = req.params.username;

  Users.findOneAndUpdate(
    { username: user },
    { $push: { offerService: req.body.offerService } },
    { new: true }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// delete offer service
router.put("/offer-service-delete/:username", (req, res) => {
  let user = req.params.username;

  Users.findOneAndUpdate(
    { username: user },

    { $pull: { offerService: req.body.offerService } },
    { new: true }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update offer Stuff
router.put("/offer-stuff/:username", (req, res) => {
  let user = req.params.username;

  Users.findOneAndUpdate(
    { username: user },
    { $push: { offerStuff: req.body.offerStuff } },
    { new: true }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// delete Offer Stuff
router.put("/offer-stuff-delete/:username", (req, res) => {
  let user = req.params.username;

  Users.findOneAndUpdate(
    { username: user },

    { $pull: { offerStuff: req.body.offerStuff } },
    { new: true }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// delete user

// router.delete("/:id", (req, res, next) => {
//   const query = { _id: req.params.id };
//   Users.deleteOne(query)
//     .then(doc => {
//       res.json(doc);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = router;
