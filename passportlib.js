//------------------------------------ index.js ----------------------------------------
//redirect user to /auth/google when user clicks login with google
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//callback from google /auth/google/callback on after user authentication 
router.get('/auth/google/callback', passport.authenticate('google', 
                        {/* successRedirect : '/uploadFile',*/failureRedirect : '/'}), processRequest.authGoogle);

//------------------------------------passport.js ---------------------------------------
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');
var passport = require('passport');
var User = require('../models/users.js')

module.exports = function() {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
    	console.log("------------___> serialize")
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
    	console.log("-----------------_______> deserialize")
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                   // if a user is found, log them in
                    console.log("user exist")
                    return  done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();
                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                    	console.log("user created")
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

};

//----------------------  processRequest.js --------------------------------------------
authGoogle: function(req, res) {
		console.log("in authGoogle")
		req.session.username = "deepak"
		req.session.role = 'user'
        res.redirect("/home");
},
