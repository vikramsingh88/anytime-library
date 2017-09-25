let express = require('express');
let router = express.Router();
let User = require('../models/user');
let passport = require('passport');
let jsonwebtoken = require('jsonwebtoken');
let config = require('../config/database');

//Register api
router.post('/register', (req, res) => {
    let newUser = new User({
        'firstName' : req.body.firstName,
        'lastName' : req.body.lastName,
        'email' : req.body.email,
        'password' : req.body.password,
        'admin' : req.body.admin
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to register user'});
        } else {
            res.json({'success' : true, msg : 'User registerd'});
        }
    });
});

//Authentication api
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({'success' : false, 'message' : 'User not found'});
        }
        User.comparePassword(password, user.password, (isMatched) => {
            if(isMatched) {
                const token = jsonwebtoken.sign({'data' : user}, config.secret, {expiresIn : 604800});
                let response = res.json({
                    'success' : true,
                    'message' : 'Login successfully',
                    'token' : 'Bearer '+token,
                    'user' : {
                        'id' : user._id,
                        'name' : user.firstName+ ' '+user.lastName,                        
                        'email' : user.email,
                        'admin' : user.admin
                    }
                });
                return response;
            } else {
                return res.json({'success' : false, 'message' : 'email or password wrong'});
            }
        });
    });
});

//profile api
router.get('/profile', passport.authenticate('jwt', {'session' : false}), (req, res, next) => {
    res.json({'user' : req.user});
});

//Get user details by id
router.post('/getUserById', passport.authenticate('jwt', {'session' : false}), (req, res, next) => {    
    //check if user is admin    
    if(req.user.admin === 'false') {        
        return res.json({'success' : false, msg : 'Do not have access to this api'});
    }

    User.getUserById(req.body.userId, (err, user) => {
        if(err) {
            console.log(err);
            return res.json({'success' : false, msg : 'Error'});
        }
        res.json({'success' : true, msg : 'success', 'name' : user.firstName +' '+user.lastName});
    });    
});

//Get all non admin users
router.get('/getNonAdminUsers', passport.authenticate('jwt', {'session' : false}), (req, res, next) => {
    //check if user is admin    
    if(req.user.admin === 'false') {        
        return res.json({'success' : false, msg : 'Do not have access to this api'});
    }

    User.getAllNonAdminUser((err, users) => {
        if(err) {
            console.log(err);
            return res.json({'success' : false, msg : 'Error'});
        }
        res.json({'success' : true, msg : 'success', 'users' : users});
    });    
});

module.exports = router;