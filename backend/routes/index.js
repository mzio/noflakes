const middleware = require("./middleware");
const apiRoutes = require("./api");
const renderRoute = require("../../iso-middleware/renderRouterMiddleware")
  .default;
const express = require("express");
const path = require("path");

module.exports = (server, passport) => {
  const buildPath = path.join(__dirname, "../../", "build");
  server.use("/", express.static(buildPath));
  // server.use(express.static(__dirname));
  server.use("/api", apiRoutes);

  server.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
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

  server.get("*", renderRoute);
};
