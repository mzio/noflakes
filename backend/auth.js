const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process,
        clientSecret: "",
        callbackURL: "/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, {
          profile: profile,
          token: accessToken
        });
      }
    )
  );
};
