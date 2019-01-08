const Pact = require("../models/pactModel");

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
    pact.usersIds = req.body.userIds;
    pact.description = req.body.description;
    pact.endTime = req.body.endTime;

    pact.save(err => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          message: "New pact created.",
          data: pact
        });
      }
    });
  },

  view: (req, res) => {
    Pact.findById(req.params.pact_id, (err, pact) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: "Pact details loading.",
          data: pact
        });
      }
    });
  },

  update: (req, res) => {
    Pact.findById(req, params.pact_id, (err, pact) => {
      if (err) {
        res.send(err);
      } else {
      }
    });
  },

  delete: (req, res) => {
    Pact.deleteOne(
      {
        _id: req.params.pact_id
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
