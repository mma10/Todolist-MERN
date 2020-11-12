const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const TaskSchema = new Schema ({
//     item: {
//         type: String
//     }
// });

const TaskSchema = require('./taskSchema').schema;

const UserSchema = new Schema ({
    name: {
        type: String,
        required: [true,'name field is required']      
    },
    email: {
        type: String,
        required: [true,'email field is required'] 
    },
    password: {
        type: String,
        required: [true,'password is required'] 
    },
    tasks: [TaskSchema]
    
});

const User = mongoose.model('User',UserSchema);

module.exports = User;