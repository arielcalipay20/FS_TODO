const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    repetition: {
        type: Number,
        required: true
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;