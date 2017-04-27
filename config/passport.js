var models = require('../models');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var users = {};

exports.OAuth2Strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    users[profile.id] = profile;
    models.User.findOne({where:{email: profile.emails[0].value.toLowerCase()}}).then((user)=>{
        if(user){
            return done(null, user.dataValues);
        }
        req.session.sessionFlash = {
            type: 'errors', 
            msg: 'User not found, please login again.'
        };
        return done(null);
    });
    
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    models.User.findOne({where:{id: id}}).then((user)=>{
        if(user){
            return done(null, user.dataValues);
        }
        return done(null);
    });
     //example https://github.com/sahat/hackathon-starter
});

exports.users = users;
