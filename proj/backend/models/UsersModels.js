const mongoose = require('mongoose');

// setting up the data storing users models
const UserSchema = new mongoose.Schema({

    username:{ 
        type:String, 
        required:true, 
        unique:true 
    },

    password:{ 
        type:String, 
        required:true
    },

    budget:{
        type: Number,
        required: true,
        maxLength: 15,
        trim: true
    }
});

module.exports = mongoose.model('users', UserSchema)