const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user" 
        },
        favorites:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
        watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
