const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('users');
// key for decryption payload
// key was also used for encryption for creating jwt
const keys = require('../config/keys');

//we are using jwt strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// key is use for decryption payload from jwt
opts.secretOrKey = keys.secretOrKey;

// read the JWT from Autorization header
module.exports = passport => {
  // middleware
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      // jwt_payload is paylod from jwt.sign in user.js
      // find user by id in database
      User.findById(jwtPayload.id)
        .then(currentUser => {
          if (currentUser) {
            // user is founded
            return done(null, currentUser);
          }
          // user is not founded
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
