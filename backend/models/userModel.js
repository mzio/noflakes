const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  oauthId: {
    type: String,
    required: true
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
  pactIdsActive: {
    type: [String]
  },
  pactIdsInactive: {
    type: [String]
  },
  friendIds: {
    type: [String]
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
module.exports.get = (callback, limit) => {
  User.find(callback).limit(limit);
};
