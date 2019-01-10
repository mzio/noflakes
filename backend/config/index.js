const configPassport = require("./passport.js");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

module.exports = (server, passport, mongoose) => {
  server.use(
    cookieSession({
      name: "session",
      keys: ["secret1"],
      maxAge: 24 * 60 * 60 * 1000
    })
  );

  server.use(cookieParser());

  configPassport(passport);
  server.use(passport.initialize());
  server.use(passport.session());

  server.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  server.use(bodyParser.json((strict = false)));

  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true
    }
  );

  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);
  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );

  if (process.env.MODE !== "dev") {
    server.use(
      express.static(path.resolve(__dirname, "../../frontend/public"))
    );
  }
};
