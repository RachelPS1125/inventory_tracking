var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var users = {};

exports.OAuth2Strategy = new GoogleStrategy({
    clientID:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done)=>{
    users[profile.id] = profile;
    done(null, profile);
});

passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser((id, done)=>{
    done(null, users[id]);
});

exports.users = users;