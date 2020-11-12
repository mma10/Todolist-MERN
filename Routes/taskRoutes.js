const express = require('express')
const router = express.Router()   
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('../models/taskSchema')
const User = require('../models/userSchema')
const auth = require('../middleware/authMiddleware')

router.get('/:token', auth, function(req,res){      
    User.findById(req.user.id).then(user => {
        if(!user) return res.status(400).json({ msg: "No user, authentication denied" });        
        res.json({
            tasks: user.tasks
        });
    });       
});   

router.post('/:token', auth,function(req,res){  
    User.findById(req.user.id).then(user => {
        if(!user) return res.json.status(400).json({ msg: "please login to perform the task" });

        const updatedUser = user;

        const task = new Task(req.body);
        task.save();
        user.tasks.push(task);
                
        user.save().then(() => {
            res.json(task);    
        }).catch(err => {
            res.status(400).json({msg: "failed to add task"});
        });                
    });       
});

router.delete('/:token/:id', auth, function(req,res){
    User.findById(req.user.id).then(user => {
        Task.deleteOne({ _id: req.params.id }).catch((err) => {
            res.status(400).json({msg: 'Failed to delete from task'});
        });  
        
        User.findByIdAndUpdate(req.user.id, { $pull: { 'tasks': { _id: req.params.id } } }).then(() => {            
            res.json();;
        }).catch(err => {
            res.status(400).json({ msg: "delete failed" });
        });                         
    });            
}); 

router.put('/:token/:id', auth, function(req,res){
    Task.findOneAndUpdate({ _id: req.params.id }, { item: req.body.item })
    .catch(err => {
        res.status(400).json({ msg: "failed to update the task"});
    });

    User.updateOne({ _id: req.user.id, "tasks._id": req.params.id }, { $set: { "tasks.$.item": req.body.item } })
    .then(() => {        
        res.json();
    })
   .catch((err) => {
        res.status(400).json({ msg: "failed to update task" });
    });     
    
});

module.exports = router;