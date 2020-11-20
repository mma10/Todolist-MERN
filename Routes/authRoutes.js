const express = require('express')
const router = express.Router()   
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userSchema')
const auth = require('../middleware/authMiddleware')

router.post('/login',(req,res) => {
    const { email, password } = req.body;
        
    if(!email || !password)
        return res.status(400).json({msg: 'Enter all fields'});    
    
    User.findOne({email}).then( user => {
        if(!user) return res.status(401).json({msg: 'invalid email'});
        
        bcrypt.compare(password, user.password).then( isMatch => {
            if(!isMatch) return res.status(401).json({msg: 'incorrect password'});

            jwt.sign({id: user._id}, process.env.JWT_KEY || "myJWTSecret", { expiresIn: 3600 }, (err, token) => {
                if(err) throw err;                
                res.json({        
                    token,                    
                    user: {
                        id: user._id,
                        name: user.name,
                        email,
                        tasks: user.tasks
                    }
                });
            });
        });
    });
});

// load user

router.get('/user/:token', (req,res) => {        
    const token = req.params.token;
    //console.log(token,'token');
    if(token == null || token == 'null' || token == 'undefined') 
        return res.status(401).json({msg: 'No token, authorisation denied from middleware'});
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY || "myJWTSecret");    
        req.user = decoded;                        
    } 
    catch(err){
        res.status(400).json({msg: 'invalid token'});
    }
    
    User.findById(req.user.id).select('-password').then( user => { 
        if(!user)
            res.status(400).json({msg: 'No user found'});      
        res.json(user);
    });       

});


module.exports = router;