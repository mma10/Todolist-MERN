const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    item: String
});

const Task = mongoose.model('task',TaskSchema);

module.exports = Task;
