module.exports = {
  checkAuthentication: function(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.send("You must login!");
    }
  }
};
