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
        res.json({
          status: "success",
          data: pact
        });
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
          for (let i = 0; i < pact.users.length; i++) {
            pact.usersStatus[i] =
              req.body.usersStatus[i] || pact.usersStatus[i];
            User.findOne(
              {
                username: pact.users[i]
              },
              (err, user) => {
                if (err) {
                  res.send(err);
                } else if (user) {
                  /*
                   * TODO Remove all of these .forEach calls
                   * once other bugs have been removed and we
                   *  are certain there is no pact duplication
                   */
                  Object.keys(user.pacts).forEach(key => {
                    var filtered = [];
                    for (var j = 0; j < user.pacts[key].length; j++) {
                      if (user.pacts[key][j] != pact._id) {
                        filtered.push(user.pacts[key][j]);
                      }
                    }
                    user.pacts[key] = filtered;
                  });
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
          pact.markModified("usersStatus");
          pact.save(err => {
            if (err) {
              res.send(err);
            } else {
              res.json({
                status: "success",
                data: pact
              });
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
            status: "success",
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
            status: "success"
          });
        }
      }
    );
  },

  viewUserStatus: (req, res) => {
    Pact.findOne(
      {
        _id: req.params.pactId
      },
      (err, pact) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            status: "success",
            data: pact.usersStatus[pact.users.indexOf(req.params.username)]
          });
        }
      }
    );
  },

  updateUserStatus: (req, res) => {
    Pact.findOne(
      {
        _id: req.params.pactId
      },
      (err, pact) => {
        if (err) {
          res.send(err);
        } else {
          pact.usersStatus[pact.users.indexOf(req.params.username)] =
            req.body.status;
          User.findOne(
            {
              username: req.params.username
            },
            (err, user) => {
              if (err) {
                res.send(err);
              } else if (user) {
                Object.keys(user.pacts).forEach(key => {
                  var filtered = [];
                  for (var j = 0; j < user.pacts[key].length; j++) {
                    if (user.pacts[key][j] != pact._id) {
                      filtered.push(user.pacts[key][j]);
                    }
                  }
                  user.pacts[key] = filtered;
                });
                user.pacts[req.body.status].push(pact._id);
                user.save(err => {
                  if (err) {
                    res.send(err);
                  }
                });
              }
            }
          );

          pact.markModified("usersStatus");
          pact.save(err => {
            if (err) {
              res.send(err);
            } else {
              res.json({
                status: "success",
                data: pact
              });
            }
          });
        }
      }
    );
  },

  removeUser: (req, res) => {
    Pact.findOne(
      {
        _id: req.params.pactId
      },
      (err, pact) => {
        if (err) {
          res.send(err);
        } else {
          filteredUsers = [];
          filteredUsersStatus = [];
          for (var i = 0; i < pact.users.length; ++i) {
            if (pact.users[i] !== req.params.username) {
              filteredUsers.push(pact.users[i]);
              filteredUsersStatus.push(pact.usersStatus[i]);
            }
          }
          pact.users = filteredUsers;
          pact.usersStatus = filteredUsersStatus;
          User.findOne(
            {
              username: req.params.username
            },
            (err, user) => {
              if (err) {
                res.send(err);
              } else if (user) {
                Object.keys(user.pacts).forEach(key => {
                  var filtered = [];
                  for (var j = 0; j < user.pacts[key].length; j++) {
                    if (user.pacts[key][j] != pact._id) {
                      filtered.push(user.pacts[key][j]);
                    }
                  }
                  user.pacts[key] = filtered;
                });
                user.save(err => {
                  if (err) {
                    res.send(err);
                  }
                });
              }
            }
          );

          pact.markModified("usersStatus");
          pact.save(err => {
            if (err) {
              res.send(err);
            } else {
              res.json({
                status: "success",
                data: pact
              });
            }
          });
        }
      }
    );
  },

  addUser: (req, res) => {
    Pact.findOne(
      {
        _id: req.params.pactId
      },
      (err, pact) => {
        if (err) {
          res.send(err);
        } else {
          var status = req.params.username || "pending";
          pact.users.push(req.params.username);
          pact.usersStatus.push(status);
          User.findOne(
            {
              username: req.params.username
            },
            (err, user) => {
              if (err) {
                res.send(err);
              } else if (user) {
                Object.keys(user.pacts).forEach(key => {
                  var filtered = [];
                  for (var j = 0; j < user.pacts[key].length; j++) {
                    if (user.pacts[key][j] != pact._id) {
                      filtered.push(user.pacts[key][j]);
                    }
                  }
                  user.pacts[key] = filtered;
                });
                user.pacts[status].push(pact._id);
                user.save(err => {
                  if (err) {
                    res.send(err);
                  }
                });
              }
            }
          );

          pact.markModified("usersStatus");
          pact.save(err => {
            if (err) {
              res.send(err);
            } else {
              res.json({
                status: "success",
                data: pact
              });
            }
          });
        }
      }
    );
  },

  indexUsers: (req, res) => {
    Pact.findOne(
      {
        _id: req.params.pactId
      },
      (err, pact) => {
        if (err) {
          res.send(err);
        } else {
          var out = {};
          for (var i = 0; i < pact.users.length; ++i) {
            out[pact.users[i]] = pact.usersStatus[i];
          }
          res.json({
            status: "success",
            data: out
          });
        }
      }
    );
  }
};
