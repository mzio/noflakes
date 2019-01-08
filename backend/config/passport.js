const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const configAuth = require("./auth");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      configAuth.googleAuth,
      (accessToken, refreshToken, profile, done) => {
        return done(null, {
          profile: profile,
          token: accessToken
        });
      }
    )
  );
};
