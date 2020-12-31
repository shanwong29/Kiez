const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Reference = require("../models/Reference");
const { distance } = require("../service/distance");

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
  const loggedInUserCoordinates = JSON.parse(req.query.loggedInUserCoordinates);
  if (
    !req.query.type ||
    !req.query.loggedInUserCoordinates ||
    typeof req.query.searchWord !== "string"
  ) {
    return res.status(409).json("req.query incomplete");
  }

  let keyWords;
  let query = {};
  if (req.query.searchWord) {
    keyWords = new RegExp(req.query.searchWord, "i");
  }

  if (req.query.type === "Help" && req.query.searchWord) {
    query = {
      $or: [
        { offerService: { $in: [keyWords] } },
        { offerStuff: { $in: [keyWords] } },
      ],
    };
  } else if (req.query.type && req.query.searchWord) {
    // default = Neighbors, search by name
    query = {
      username: { $in: [keyWords] },
    };
  }

  Users.find(query)
    .then((foundUsers) => {
      foundUsers = foundUsers.reduce((acc, el) => {
        const neighborDistance = distance(
          loggedInUserCoordinates,
          el.address.coordinates
        );

        const limit = 3; //3km
        if (neighborDistance < limit && el._id.toString() !== req.user.id) {
          const {
            username,
            credits,
            imageUrl,
            offerStuff,
            offerService,
            _id,
          } = el;
          acc.push({
            username,
            credits,
            imageUrl,
            offerStuff,
            offerService,
            _id,
            distance: neighborDistance,
          });
        }

        return acc;
      }, []);

      foundUsers = foundUsers.sort((a, b) => {
        if (a.distance < b.distance) {
          return -1;
        }

        if (a.distance > b.distance) {
          return 1;
        }

        return 0;
      });

      res.json(foundUsers);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get user by id
router.get("/getUserById", loginCheck(), async (req, res) => {
  let doc;
  try {
    doc = await Users.findById(req.query.id);

    if (!doc) {
      return res.status(404).json({ message: "This user does not exist" });
    }

    const { username, imageUrl } = doc;
    res.json({ username, imageUrl });
  } catch (err) {
    res.status(500).json(err);
  }
});

// return one user
router.get("/:username", loginCheck(), async (req, res) => {
  let doc;
  try {
    doc = await Users.findOne(
      { username: req.params.username },
      { password: 0, joinedEvents: 0 }
    ).populate({
      path: "reference",
      populate: {
        path: "author",
        select: "username imageUrl",
      },
    });

    if (!doc) {
      return res.status(404).json({ message: "This user does not exist" });
    }

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
    res.json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
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
      res.json({ aboutMe: doc.aboutMe });
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
          doc.password = undefined;
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
      doc.password = undefined;
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
      res.json({ offerService: doc.offerService });
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
      res.json({ offerService: doc.offerService });
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
      res.json({ offerStuff: doc.offerStuff });
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
      res.json({ offerStuff: doc.offerStuff });
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
