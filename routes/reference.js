const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Reference = require("../models/Reference");

// const query1 = MyModel.find({ name: /john/i }, null, { skip: 10 });
// const result1 = await query1.exec();

// const query2 = MyModel.find({ name: /john/i }, null, { skip: 100 });
// const result2 = await query2.exec();

// const creatRef =   Reference.create({
//   content: req.body.content,
//   author: req.body.author,
//   rating: req.body.rating
//   // profileOwnerCredit: this.state.credit,
//   // authorCredit: this.state.authorCredit
// })

// const updateAuthorCredits =      User.findByIdAndUpdate(req.body.author, { credits: 50 }, { new: true })

// const updateAuthorCredits =  User.findByIdAndUpdate(req.body.author, { credits: 50 }, { new: true })
router.put("/profile-owner", (req, res, next) => {
  // User.findByIdAndUpdate(req.body.author, { credits: 50 }, { new: true })

  User.findOneAndUpdate(
    { username: req.body.username },
    { credits: req.body.credits },
    { new: true }
  )

    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/author", (req, res, next) => {
  User.findByIdAndUpdate(req.body.author, { authorCredits: 50 }, { new: true })

    // User.findOneAndUpdate(
    //   { username: req.body.name },
    //   { credits: req.body.credits },
    //   { new: true }
    // )

    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res, next) => {
  Reference.create({
    content: req.body.content,
    author: req.body.author,
    rating: req.body.rating
    // profileOwnerCredit: this.state.credit,
    // authorCredit: this.state.authorCredit
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
