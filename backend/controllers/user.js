// controllers/user.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User created!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// controllers/user.js
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Incorrect login/password pair" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Incorrect login/password pair" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
              },
              "GUoWMLippni3Yg7YMw-7uSaO8WqpxGoM!I1tFC9MNLJL-aXOLs7pivp-oXLOHVyHJ/XZ=u6cVG/3r8XMZ7VCe6r1lme/he=GSkhLxkFRK!a=Fm?-8jpYCmr=8Uli34XMOLutZnuxVgYu4?G2vmOXaHyj1J7DJnQllC7UcwrhRz=OiiG9q?7u/nIKJ9mmm9!mmXmDOSDaJ2eSm2f0UzHm/G/LeMFY4qDWkBWqysn25QZYUfW7UgNYr04wFqm/56y",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
