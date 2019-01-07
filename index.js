const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const app = express();
const port = 4000;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({}));
app.get("/", (req, res) => res.send("Fish!"));

app.listen(port);
