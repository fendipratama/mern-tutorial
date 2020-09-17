const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const User = require('../../models/User');

// @route   GET api/posts/test
// @desc    test posts route
// @access  public
router.get('/test', function(req, res){
    res.status(200).json({
        'msg' : 'users works'
    });
});

// @route   POST api/posts/register
// @desc    test posts route
// @access  public
router.post('/register', function(req, res){
    User.findOne({
        email : req.body.email
    })
    .then(User => {
        if(User){
            return res.status(400).json({'email' : 'email already exists'});
        }else{
            const avatar = gravatar.url(req.body.email, {
                s : '200',
                r : 'pg',
                d : 'mm'
            });

            const newUser = new User({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err){
                        throw err;
                    }else{
                        newUser.password = hash;
                        newUser.save()
                            .then(User => res.json(User))
                            .catch(err => console.log(err));
                        //res.status(200).json(User);
                    }
                });
            });
        }
    });
});

module.exports = router;