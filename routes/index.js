const express = require("express");
const router = express.Router();

// //const geocoder = require("geocoder");
// const geocoder = require("google-geocoder");
// let geo = geocoder({
//   key: process.env.geocodeKey
// });

// // geolocation-function for converting address to coordinates
// geolocation = (street, houseNumber, postalCode, city) => {
//   return new Promise((resolve, reject) => {
//     geo.find(
//       `${street} ${houseNumber}, ${postalCode} ${city}`,
//       (err, res) => {
//         if (err) return reject(err);
//         console.log(
//           "GEOCODE RESULT-array-element:",
//           // res[0].formatted_address,
//           res[0]
//         );
//         resolve(res[0]);
//       }
//     );
//   });
// };

// include CLOUDINARY:
const uploader = require("../configs/cloudinary-setup");
const { loginCheck } = require("../service/loginCheck");

router.post(
  "/upload",
  loginCheck(),
  uploader.single("imageUrl"),
  (req, res, next) => {
    console.log("file is: ", req.file);

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // get secure_url from the file object and save it in the
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
  }
);

module.exports = router;

// export {geolocation};
