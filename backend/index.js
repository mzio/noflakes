const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const MongoClient = require("mongodb").MongoClient;
const server = express();
const auth = require("./auth");

server.use(
  cookieSession({
    name: "session",
    keys: ["secret1"],
    maxAge: 24 * 60 * 60 * 1000
  })
);

server.use(cookieParser());

auth(passport);
server.use(passport.initialize());
server.use(passport.session());

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

server.get("/secret", checkAuthentication, (req, res) => {
  res.send("You have reached the secret route.");
});

function checkAuthentication(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send("You must login!");
  }
}

module.exports = server;