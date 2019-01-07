const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();
const auth = require("./auth");
const port = process.env.PORT || 4000;

app.use(
  cookieSession({
    name: "session",
    keys: ["secret1"],
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use(cookieParser());

auth(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
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

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/"
  }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect("/");
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("/");
});

app.get("/secret", checkAuthentication, (req, res) => {
  res.send("You have reached the secret route.");
});

function checkAuthentication(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send("You must login!");
  }
}

app.listen(port, () => {
    console.log(`App running on port ${ port }`);
});
