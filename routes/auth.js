const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

/////////////////////////////////////////////////////////////
const geocoder = require("google-geocoder");
let geo = geocoder({
  key: process.env.geocodeKey
});

geolocation = (street, houseNumber, postalCode, city) => {
  return new Promise((resolve, reject) => {
    geo.find(`${street} ${houseNumber}, ${postalCode} ${city}`, (err, res) => {
      if (err) return reject(err);

      resolve(res[0]);
    });
  });
};

///////////////////////////////////////////////////////////

router.post("/signup", (req, res) => {
  const {
    username,
    password,
    street,
    houseNumber,
    city,
    postalCode
  } = req.body;

  User.findOne({ username: username }).then(found => {
    if (found) {
      return res
        .status(400)
        .json({ message: "This username is already taken" });
    }
    return bcrypt
      .genSalt()
      .then(salt => {
        return bcrypt.hash(password, salt);
      })
      .then(hash => {
        geolocation(street, houseNumber, postalCode, city)
          .then(geo => {
            const coordinates = geo.location;
            const formattedAddress = geo.formatted_address;
            User.create({
              username: username,
              password: hash,
              address: {
                street,
                houseNumber,
                city,
                postalCode,
                coordinates,
                formattedAddress
              },
              imageUrl:
                "https://res.cloudinary.com/dqrjpg3xc/image/upload/v1575560272/kiez/default-user.jpg.jpg"
            }).then(newUser => {
              // passport login
              req.login(newUser, err => {
                if (err) res.status(500).json(err);
                else res.json(newUser);
              });
            });
          })
          .catch(err => {
            console.log(err);
            res.json({
              message:
                "Address provided is not found. Please make sure a valid address is given."
            });
          });
      });
  });
});

const passport = require("passport");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      // no user found with username or password didn't match
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // passport req.login
    req.login(user, err => {
      if (err) res.status(500).json(err);
      res.json(user);
    });
  })(req, res, next);
});

router.delete("/logout", (req, res) => {
  // passport logout function
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
