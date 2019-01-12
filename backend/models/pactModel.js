const mongoose = require("mongoose");

const pactSchema = mongoose.Schema({
  name: {
    type: String
  },
  owner: {
    type: String
  },
  users: {
    type: [String],
    required: true
  },
  usersStatus: {
    type: [String],
    required: true
  },
  description: {
    type: String
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  }
});

const Pact = mongoose.model("pact", pactSchema);

module.exports = Pact;
module.exports.get = (callback, limit) => {
  Pact.find(callback).limit(limit);
};
