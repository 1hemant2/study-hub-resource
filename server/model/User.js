const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.length >= 6;
            },
            message: "password must be atleast 6 character long"
        }
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})
const User = mongoose.model("User", UserSchema);
module.exports = { User };