const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./database');

module.exports = function(passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, next) => {
      console.log(jwt_payload);
      User.getUserById(jwt_payload.data._id, (err, user) => {
        if(err) {
            return next(err, false);
        }
        if(user) {
            const response = {
                    'id' : user._id,
                    'name' : user.firstName+ ' '+user.lastName,                        
                    'email' : user.email,
                    'admin' : user.admin
            }
            return next(null, response);
        } else {
            return next('null', 'false');
        }
      });
  }));
}
