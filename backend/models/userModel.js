const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  oauthId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  pacts: {
    pending: [String],
    accepted: [String],
    incomplete: [String],
    complete: [String],
    successful: [String],
    inactive: [String]
  },
  friend_requests: {
    pending: [String],
    sent: [String]
  },
  friends: {
    type: [String]
  },
  score: {
    type: Number,
    default: 0.5
  },
  friend: {
    type: Number,
    default: 0.0
  },
  flake: {
    type: Number,
    default: 0.0
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
module.exports.get = (callback, limit) => {
  User.find(callback).limit(limit);
};
