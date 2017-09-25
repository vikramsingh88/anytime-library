let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

//User schema
const UserSchema = mongoose.Schema({
    'firstName' : {type : String, required : true},
    'lastName' : {type : String, required : true},
    'email' : {type : String, required : true, 'unique' : true},
    'password' : {type : String, required : true},
    'admin' : {type : String, required : true}
});
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = {'email' : email};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(password, savePassword, callback) {
    bcrypt.compare(password, savePassword, (err, isMatched) => {
        if(err) throw err;
        callback(isMatched);
    })
}

//Get all non admin user
module.exports.getAllNonAdminUser = function(callback) {
    const query = {'admin' : 'false'};
    User.find(query, callback);
}