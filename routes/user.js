const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Reference = require("../models/Reference");

////////////////////////////////////////////////////////////

//const geocoder = require("geocoder");
const geocoder = require("google-geocoder");
const { loginCheck } = require("../service/loginCheck");
let geo = geocoder({
  key: process.env.geocodeKey,
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
router.get("/", loginCheck(), (req, res) => {
  Users.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// return one user
router.get("/:username", loginCheck(), (req, res) => {
  Users.findOne({ username: req.params.username })
    .populate({
      path: "reference",
      populate: {
        path: "author",
        select: "username imageUrl",
      },
    })
    .then((doc) => {
      doc.password = undefined;
      doc.joinedEvents = [];
      if (req.user.id !== doc._id.toString()) {
        doc.address = {
          street: "",
          houseNumber: "",
          city: "",
          postalCode: "",
          coordinates: {},
          formattedAddress: "",
        };
      }
      if (!doc) {
        res.status(404).json({ message: "This user does not exist" });
      } else res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//update about me
router.put("/:username", loginCheck(), (req, res) => {
  let user = req.params.username;
  let aboutMe = req.body.aboutMe;
  // let aboutMe = req.body.aboutMe;

  Users.findOne({ username: req.params.username }).then((doc) => {
    if (req.user._id != doc._id.toString()) {
      return res
        .status(409)
        .json({ message: "User can only edit their own profile" });
    }
  });

  Users.findOneAndUpdate(
    { username: user },
    { aboutMe: aboutMe },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//update address
router.put("/address/:username", loginCheck(), (req, res) => {
  let user = req.params.username;
  let street = req.body.street;
  let houseNumber = req.body.houseNumber;
  let city = req.body.city;
  let postalCode = req.body.postalCode;

  Users.findOne({ username: req.params.username }).then((doc) => {
    if (req.user._id != doc._id.toString()) {
      return res
        .status(409)
        .json({ message: "User can only edit their own profile" });
    }
  });

  geolocation(street, houseNumber, postalCode, city)
    .then((geocodeData) => {
      Users.findOneAndUpdate(
        { username: user },
        {
          address: {
            street: street,
            houseNumber: houseNumber,
            city: city,
            postalCode: postalCode,
            coordinates: geocodeData.location,
            formattedAddress: geocodeData.formatted_address,
          },
        },
        { new: true }
      )
        .then((doc) => {
          res.json(doc);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log("err from geocoding", err);
      res.json({
        message:
          "Sorry! The geolocation feature is not supported anymore. You may play around with other features",
      });
    });
});

// update profile pic
router.put("/profile-pic/:username", loginCheck(), (req, res) => {
  let user = req.params.username;

  Users.findOne({ username: req.params.username }).then((doc) => {
    if (req.user._id != doc._id.toString()) {
      return res
        .status(409)
        .json({ message: "User can only edit their own profile" });
    }
  });

  Users.findOneAndUpdate(
    { username: user },
    { imageUrl: req.body.imageUrl },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// update offer service
router.put("/offer-service/:username", loginCheck(), (req, res) => {
  let user = req.params.username;

  Users.findOne({ username: user }).then((doc) => {
    if (req.user._id != doc._id.toString()) {
      return res
        .status(409)
        .json({ message: "User can only edit their own profile" });
    }
  });

  Users.findOneAndUpdate(
    { username: user },
    { $push: { offerService: req.body.offerService } },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// delete offer service
router.put("/offer-service-delete/:username", loginCheck(), (req, res) => {
  let user = req.params.username;

  Users.findOne({ username: req.params.username }).then((doc) => {
    if (req.user._id != doc._id.toString()) {
      return res
        .status(409)
        .json({ message: "User can only edit their own profile" });
    }
  });

  Users.findOneAndUpdate(
    { username: user },

    { $pull: { offerService: req.body.offerService } },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// update offer Stuff
router.put("/offer-stuff/:username", loginCheck(), (req, res) => {
  let user = req.params.username;

  Users.findOne({ username: req.params.username }).then((doc) => {
    if (req.user._id != doc._id.toString()) {
      return res
        .status(409)
        .json({ message: "User can only edit their own profile" });
    }
  });

  Users.findOneAndUpdate(
    { username: user },
    { $push: { offerStuff: req.body.offerStuff } },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// delete Offer Stuff
router.put("/offer-stuff-delete/:username", loginCheck(), (req, res) => {
  let user = req.params.username;

  Users.findOne({ username: req.params.username }).then((doc) => {
    if (req.user._id != doc._id.toString()) {
      return res
        .status(409)
        .json({ message: "User can only edit their own profile" });
    }
  });

  Users.findOneAndUpdate(
    { username: user },

    { $pull: { offerStuff: req.body.offerStuff } },
    { new: true }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
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
