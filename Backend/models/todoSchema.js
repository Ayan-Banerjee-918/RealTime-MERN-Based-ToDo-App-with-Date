const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task_desc:{
        type: String,
        required : true
    },
    task_due:{
        type : Date, 
        required : true
    },
    is_complete: {
        type : Boolean,
        default : false
    },
    username: {
        type: String,
        required : true
    }
});

const taskModel = mongoose.model("todo",taskSchema);
module.exports = taskModel;