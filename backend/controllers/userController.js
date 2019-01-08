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
    user.oauthId = req.body.ouathId;
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
    User.findOneAndUpdate(
      { _id: req.params.user_id },
      req.body,
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.json(user);
        }
      }
    );
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
