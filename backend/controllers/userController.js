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
    if (req.user) {
      user.oauthId = req.user.profile.id || req.body.oauthId;
      user.firstName = req.user.profile.name.givenName || req.body.firstName;
      user.lastName = req.user.profile.name.familyName || req.body.lastName;
      user.username = req.body.username;
    } else {
      user.oauthId = req.body.oauthId;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.username = req.body.username;
    }

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
      (err, user) => {
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

  indexFriends: (req, res) => {
    User.findOne(
      {
        username: req.params.username
      },
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          var out = {};
          out.friends = user.friends;
          out.friend_requests = user.friend_requests;
          res.json({
            status: "success",
            data: out
          });
        }
      }
    );
  },

  sendFriendRequest: (req, res) => {
    User.findOne(
      {
        username: req.params.username
      },
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          if (user.friends.indexOf(req.body.friendname) >= 0) {
            res.json({
              status: "failure",
              message: "Users already friends, no request needed."
            });
          } else if (
            user.friend_requests.sent.indexOf(req.body.friendname) >= 0
          ) {
            res.json({
              status: "failure",
              message: "Friend request already sent, no request needed."
            });
          } else if (
            user.friend_requests.pending.indexOf(req.body.friendname) >= 0
          ) {
            User.findOne(
              {
                username: req.body.friendname
              },
              (err, friend) => {
                if (err) {
                  res.send(err);
                } else {
                  user.friend_requests.pending.pull(friend.username);
                  user.friends.push(friend.username);
                  friend.friend_requests.sent.pull(user.username);
                  friend.friends.push(user.username);
                  user.save(err => {
                    if (err) {
                      res.send(err);
                    } else {
                      friend.save(err => {
                        if (err) {
                          res.send(err);
                        } else {
                          res.json({
                            status: "success"
                          });
                        }
                      });
                    }
                  });
                }
              }
            );
          } else {
            User.findOne(
              {
                username: req.body.friendname
              },
              (err, friend) => {
                if (err) {
                  res.send(err);
                } else {
                  user.friend_requests.sent.push(friend.username);
                  friend.friend_requests.pending.push(user.username);
                  user.save(err => {
                    if (err) {
                      res.send(err);
                    } else {
                      friend.save(err => {
                        if (err) {
                          res.send(err);
                        } else {
                          res.json({
                            status: "success"
                          });
                        }
                      });
                    }
                  });
                }
              }
            );
          }
        }
      }
    );
  },

  viewFriendRequest: (req, res) => {
    User.findOne(
      {
        username: req.params.username
      },
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          if (user.friends.indexOf(req.params.friendname) >= 0) {
            res.json({
              status: "success",
              body: {
                friendStatus: "friends",
                requestStatus: "none"
              }
            });
          } else if (
            user.friend_requests.sent.indexOf(req.params.friendname) >= 0
          ) {
            res.json({
              status: "success",
              body: {
                friendStatus: "none",
                requestStatus: "sent"
              }
            });
          } else if (
            user.friend_requests.pending.indexOf(req.params.friendname) >= 0
          ) {
            res.json({
              status: "success",
              body: {
                friendStatus: "none",
                requestStatus: "pending"
              }
            });
          } else {
            res.json({
              status: "success",
              body: {
                friendStatus: "none",
                requestStatus: "none"
              }
            });
          }
        }
      }
    );
  },

  acceptFriendRequest: (req, res) => {
    User.findOne(
      {
        username: req.params.username
      },
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          if (user.friends.indexOf(req.params.friendname) >= 0) {
            res.json({
              status: "failure",
              message: "Users already friends, no accept needed."
            });
          } else if (
            user.friend_requests.sent.indexOf(req.params.friendname) >= 0
          ) {
            res.json({
              status: "failure",
              message: "Friend request already sent, no accept needed."
            });
          } else if (
            user.friend_requests.pending.indexOf(req.params.friendname) >= 0
          ) {
            User.findOne(
              {
                username: req.params.friendname
              },
              (err, friend) => {
                if (err) {
                  res.send(err);
                } else {
                  user.friend_requests.pending.pull(friend.username);
                  user.friends.push(friend.username);
                  friend.friend_requests.sent.pull(user.username);
                  friend.friends.push(user.username);
                  user.save(err => {
                    if (err) {
                      res.send(err);
                    } else {
                      friend.save(err => {
                        if (err) {
                          res.send(err);
                        } else {
                          res.json({
                            status: "success"
                          });
                        }
                      });
                    }
                  });
                }
              }
            );
          } else {
            User.findOne(
              {
                username: req.body.friendname
              },
              (err, friend) => {
                if (err) {
                  res.send(err);
                } else {
                  res.json({
                    status: "failure",
                    message: "No friend request recieved, no accept needed."
                  });
                }
              }
            );
          }
        }
      }
    );
  },

  removeFriend: (req, res) => {
    User.findOne(
      {
        username: req.params.username
      },
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          User.findOne(
            {
              username: req.params.friendname
            },
            (err, friend) => {
              if (err) {
                res.send(err);
              } else {
                user.friends.pull(friend.username);
                user.friend_requests.sent.pull(friend.username);
                user.friend_requests.pending.pull(friend.username);
                friend.friends.pull(user.username);
                friend.friend_requests.sent.pull(user.username);
                friend.friend_requests.pending.pull(user.username);
                user.save(err => {
                  if (err) {
                    res.send(err);
                  } else {
                    friend.save(err => {
                      if (err) {
                        res.send(err);
                      } else {
                        res.json({
                          status: "success"
                        });
                      }
                    });
                  }
                });
              }
            }
          );
        }
      }
    );
  },

  currentUser: (req, res) => {
    if (req.user) {
      User.findOne(
        {
          oauthId: req.user.profile.id
        },
        (err, user) => {
          if (err) {
            res.send(err);
          } else if (user) {
            res.json({
              status: "success",
              data: {
                exists: true,
                user: user
              }
            });
          } else {
            res.json({
              status: "success",
              data: {
                exists: true,
                user: null
              }
            });
          }
        }
      );
    } else {
      res.json({
        status: "success",
        data: {
          exists: false,
          user: null
        }
      });
    }
  }
};
