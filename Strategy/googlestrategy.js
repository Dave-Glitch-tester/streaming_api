const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const googleUser = require("../models/googleusers");

passport.use(
  new Strategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = await googleUser.findOne({ google_id: profile.id });
      // console.log(profile);
      if (!newUser) {
        const newUser = new googleUser({
          google_id: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        });
        await newUser.save();
        done(null, newUser);
      } else {
        done(null, newUser);
      }
    }
  )
);

passport.serializeUser((User, done) => {
  done(null, User._id);
});
passport.deserializeUser(async (userId, done) => {
  const User = await googleUser.findOne({ _id: userId });
  if (!User) return done(err, null);
  done(null, User);
});
