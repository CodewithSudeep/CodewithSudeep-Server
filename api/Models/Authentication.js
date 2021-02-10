const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// model schema
const authenticationSchema = new Schema({
    _id: {
        type: ObjectId,
        required: [true, "User ID is required!"],
    },
    email: {
        type: String,
        require: [true, "Email is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    created_at: {
        type: Date,
        required: [true, "Credentials created at is required!"],
    },
    updated_at: Date,
});

// exporting model
module.exports = authenticationModel = mongoose.model(
    "auth-credential",
    authenticationSchema
);