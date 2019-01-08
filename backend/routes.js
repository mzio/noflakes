const middleware = require("./middleware");

module.exports = (server, passport) => {
  server.get("/", (req, res) => {
    if (req.session.token) {
      res.cookie("token", req.session.token);
      res.json({
        status: "session cookie set"
      });
    } else {
      res.cookie("token", "");
      res.json({
        status: "session cookie not set"
      });
    }
  });

  server.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/userinfo.profile"]
    })
  );

  server.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/"
    }),
    (req, res) => {
      req.session.token = req.user.token;
      res.redirect("/");
    }
  );

  server.get("/logout", (req, res) => {
    req.logout();
    req.session = null;
    res.redirect("/");
  });

  server.get("/secret", middleware.checkAuthentication, (req, res) => {
    res.send("You have reached the secret route.");
  });
};
