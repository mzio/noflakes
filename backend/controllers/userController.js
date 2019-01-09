const User = require("../models/userModel");

module.exports = {
  index: (req, res) => {
    User.get((err, users) => {
      if (err) {
        res.json({
          status: "error",
          message: err
        });
      }
      res.json({
        status: "success",
        data: users
      });
    });
  },

  new: (req, res) => {
    var user = new User();
    user.oauthId = req.body.oauthId;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;

    user.save(err => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          status: "success",
          data: user
        });
      }
    });
  },

  view: (req, res) => {
    User.findOne(
      {
        username: req.params.username
      },
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            status: "success",
            data: user
          });
        }
      }
    );
  },

  update: (req, res) => {
    User.findOneAndUpdate(
      {
        username: req.params.username
      },
      req.body,
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            status: "success",
            data: user
          });
        }
      }
    );
  },

  delete: (req, res) => {
    User.deleteOne(
      {
        username: req.params.username
      },
      (err, contact) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            status: "success"
          });
        }
      }
    );
  }
};
