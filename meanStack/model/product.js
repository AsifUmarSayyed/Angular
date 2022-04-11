const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        minlength: [4, "min 4 req"]
    },
    price: {
        type: Number,
        required: true,
        minlength: [2, "min 2 req"]

    },
    description: {
        type: String,
        required: true,
        minlength: [6, "min 6 req"]

    },
    
  category: {
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

module.exports = mongoose.model('Product', productScheme)