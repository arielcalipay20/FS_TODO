const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;