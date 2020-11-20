const express = require('express')
const router = express.Router()   
const mongoose = require('mongoose')
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register',(req,res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password)
        return res.status(400).json({msg: 'Enter all fields'});

    User.findOne({email}).then( existingUser => {
        if(existingUser){
            return res.status(400).json({msg: 'User already exists'});
        }

        const newUser = new User ({
            name,
            email,
            password,
            tasks: []
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then( user => {
                    jwt.sign({id: user.id}, process.env.JWT_KEY || "myJWTSecret", { expiresIn: '365d' }, (err, token) => {
                        if(err) throw err;
                        res.json({        
                            token,                    
                            user: {
                                id: user.id,
                                name,
                                email,
                                tasks: []
                            }
                        });
                    });

                });
            });
        });
    });

});    


module.exports = router;

