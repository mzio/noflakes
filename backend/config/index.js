const configPassport = require("./passport.js");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

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
  server.use(bodyParser.json());

  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true
    }
  );

  mongoose.Promise = global.Promise;

  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );
};
