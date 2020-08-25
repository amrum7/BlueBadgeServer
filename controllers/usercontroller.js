let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let User = sequelize.import("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/create", function (req, res) {
  let userModel = {
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
  };
  User.create(userModel)
    .then(function (user) {
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      res.json({
        user: user,
        message: "User successfully created",
        sessionToken: token,
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.post("/login", function (req, res) {
  User.findOne({ where: { email: req.body.user.email } }).then(
    function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, "i_am_secret", {
              expiresIn: 60 * 60 * 24,
            });

            res.status(200).json({
              user: user,
              message: "User successfully logged in!",
              sessionToken: token,
            });
          }
        });
      }
    }
  );
});

module.exports = router;
