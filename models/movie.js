const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    rate: {
        type: Number,
        required: true,
        min: 0,  
        max: 10, 
        default: 0
    }
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
