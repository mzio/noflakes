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
        clientID:
          "1000466562381-1lv0ov3041cl505tojoeads42spe1f02.apps.googleusercontent.com",
        clientSecret: "wiPBvS6WpD_CKtzFtc66xpkw",
        callbackURL: "http://localhost:4000/auth/google/callback"
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
