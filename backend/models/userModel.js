const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  oauthID: {
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
  pactIDsActive: {
    type: [String]
  },
  pactIDsInactive: {
    type: [String]
  },
  friendIDs: {
    type: [String]
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
module.exports.get = (callback, limit) => {
  User.find(callback).limit(limit);
};
