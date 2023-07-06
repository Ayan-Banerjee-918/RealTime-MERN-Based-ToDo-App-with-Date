const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required : true
    },
    user_pass:{
        type : String,
        required : true
    }
});

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;  