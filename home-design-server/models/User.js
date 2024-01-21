const mongoose = require("mongoose")

//creating schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2
    },
    phone: {
        type: String,
        required: true,
        minlength: 9
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true,
        minlength: 2
    },
    street: {
        type: String,
        required: true,
        minlength: 2
    },
    houseNumber: {
        type: Number,
        required: true,
    },
    isAdmin: {
        type: Boolean,
    },
    favorites:
        [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }]
});

//creating modal
const User = mongoose.model("users", userSchema)
module.exports = User;