const configPassport = require("./passport.js");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

module.exports = (server, passport) => {
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
};
