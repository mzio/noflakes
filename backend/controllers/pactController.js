const Pact = require("../models/pactModel");
const User = require("../models/userModel");

const statuses = ["pending", "accepted", "active", "inactive"];

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
    pact.endTime = new Date(req.body.endTime);
    pact.users = req.body.users;
    pact.owner = {
      username: req.user.username || pact.users[0],
      firstName: req.user.firstName || pact.users[0],
      lastName: req.user.lastName || ""
    };
    for (var i = 0; i < pact.users.length; ++i) {
      pact.usersStatus.set(i, "pending");
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
            pact.usersStatus.set(
              i,
              req.body.usersStatus[i] || pact.usersStatus[i]
            );
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
                  statuses.forEach(key => {
                    user.pacts[key].pull(pact._id);
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
      (err, pact) => {
        if (err) {
          res.send(err);
        } else {
          for (let i = 0; i < pact.users.length; i++) {
            User.findOne(
              {
                username: pact.users[i]
              },
              (err, user) => {
                if (err) {
                  res.send(err);
                } else if (user) {
                  statuses.forEach(key => {
                    user.pacts[key].pull(pact._id);
                  });
                  user.save(err => {
                    if (err) {
                      res.send(err);
                    }
                  });
                }
              }
            );
          }
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
          pact.usersStatus.set(
            pact.users.indexOf(req.params.username),
            req.body.status
          );
          User.findOne(
            {
              username: req.params.username
            },
            (err, user) => {
              if (err) {
                res.send(err);
              } else if (user) {
                statuses.forEach(key => {
                  user.pacts[key].pull(pact._id);
                });
                user.pacts[req.body.status].push(pact._id);
                user.save(err => {
                  if (err) {
                    res.send(err);
                  } else {
                    if (req.body.status === "accepted") {
                      let activatePact = true;
                      for (let i = 0; i < pact.usersStatus.length; ++i) {
                        if (pact.usersStatus[i] !== "accepted") {
                          activatePact = false;
                        }
                      }
                      if (activatePact) {
                        for (let j = 0; j < pact.users.length; j++) {
                          pact.usersStatus.set(j, "active");
                          User.findOne(
                            {
                              username: pact.users[j]
                            },
                            (err, user) => {
                              if (err) {
                                res.send(err);
                              } else if (user) {
                                statuses.forEach(key => {
                                  user.pacts[key].pull(pact._id);
                                });
                                user.pacts["active"].push(pact._id);
                                user.save(err => {
                                  if (err) {
                                    res.send(err);
                                  }
                                });
                              }
                            }
                          );
                        }
                      }
                    }
                  }
                });
              }
            }
          );

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
          var i = pact.users.indexOf(username);
          if (i >= 0) {
            pact.usersStatus.splice(i, 1);
          }
          pact.users.pull(username);
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
                statuses.forEach(key => {
                  user.pacts[key].pull(pact._id);
                });
                user.save(err => {
                  if (err) {
                    res.send(err);
                  }
                });
              }
            }
          );

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
                statuses.forEach(key => {
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
