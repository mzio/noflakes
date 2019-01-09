const Pact = require("../models/pactModel");
const User = require("../models/userModel");

module.exports = {
  index: (req, res) => {
    Pact.get((err, pacts) => {
      if (err) {
        res.json({
          status: "error",
          message: err
        });
      }
      res.json({
        status: "success",
        message: "Pacts retrieved successfully.",
        data: pacts
      });
    });
  },

  new: (req, res) => {
    var pact = new Pact();
    pact.name = req.body.name;
    pact.description = req.body.description;
    pact.endTime = req.body.endTime;
    pact.users = req.body.users;
    for (var i = 0; i < pact.users.length; ++i) {
      pact.usersStatus[i] = "pending";
      console.log(req.body.users[i]);
      User.findOne(
        {
          username: req.body.users[i]
        },
        (err, user) => {
          if (err) {
            res.send(err);
          } else if (user) {
            user.pacts.pending.push(pact._id);
            user.save(err => {
              if (err) {
                res.send(err);
              }
            });
          }
        }
      );
    }
    pact.save(err => {
      if (err) {
        res.send(err);
      } else {
        res.json(pact);
      }
    });
  },

  update: (req, res) => {
    Pact.findOne(
      {
        _id: req.params.pactId
      },
      (err, pact) => {
        if (err) {
          res.send(err);
        } else {
          pact.name = req.body.name || pact.name;
          pact.description = req.body.description || pact.description;
          pact.endTime = req.body.endTime || pact.endTime;
          for (var i = 0; i < pact.users.length; ++i) {
            pact.usersStatus[i] =
              req.body.params.usersStatus[i] || pact.usersStatus[i];
            User.findOne(
              {
                username: req.body.users[i]
              },
              (err, user) => {
                if (err) {
                  res.send(err);
                } else if (user) {
                  for (key in user.pacts) {
                    user.pacts[key] = user.pacts[key].filter(
                      p => p !== pact._id
                    );
                  }
                  user.pacts[pact.usersStatus[i]].push(pact._id);
                  user.save(err => {
                    if (err) {
                      res.send(err);
                    }
                  });
                }
              }
            );
          }
          pact.save(err => {
            if (err) {
              res.send(err);
            } else {
              res.json(pact);
            }
          });
        }
      }
    );
  },

  view: (req, res) => {
    Pact.findOne(
      {
        _id: req.params.pactId
      },
      (err, pact) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            message: "Pact details loading.",
            data: pact
          });
        }
      }
    );
  },

  delete: (req, res) => {
    Pact.deleteOne(
      {
        _id: req.params.pactId
      },
      (err, contact) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            status: "success",
            message: "Contact deleted."
          });
        }
      }
    );
  }
};
