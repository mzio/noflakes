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
        message: "Users retrieved successfully.",
        data: users
      });
    });
  },

  new: (req, res) => {
    var user = new User();
    user.oauthID = req.body.ouathID;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;

    user.save(err => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          message: "New user created.",
          data: user
        });
      }
    });
  },

  view: (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: "User details loading.",
          data: user
        });
      }
    });
  },

  update: (req, res) => {
    User.findById(req, params.user_id, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.username = req.body.username || user.username;
      }
    });
  },

  delete: (req, res) => {
    User.deleteOne(
      {
        _id: req.params.user_id
      },
      (err, contact) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            status: "success",
            message: "Contact deletd."
          });
        }
      }
    );
  }
};
