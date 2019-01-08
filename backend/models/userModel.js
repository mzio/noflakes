const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  oauth_id: {
    type: String,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  past_ids_active: {
    type: [String]
  },
  past_ids_active: {
    type: [String]
  },
  friend_ids: {
    type: [String]
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
module.exports.get = (callback, limit) => {
  User.find(callback).limit(limit);
};
