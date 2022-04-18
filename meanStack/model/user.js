const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({

     name: {
        type: String,
        required: true,
        min: 6,
        minlength: [4, "min 4 req"]
    },
    email: {
        type: String,
        required: true,
        minlength: [6, "min 6 req"]

    },
    password: {
        type: String,
        required: true,
        minlength: [6, "min 6 req"]

    },
    address: {
        type: String,
        required: true,
        minlength: [6, "min 6 req"]

    },
    
    contact: {
            type: String,
            required: true,
            
            
    
        },
        image: {
            type: String,
            required: true,
            
    
        },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userScheme)