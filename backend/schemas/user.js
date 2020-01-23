const mongoose = require('mongoose');

var uuid = require('node-uuid');
require('mongoose-type-email');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "N/A",
        unique: true,
    },
    user_id: {
        type: String,
        default: uuid.v4,
        unique: true
    },
    spotify_id: { type: String, required: true },
    apple_id: { type: String, required: false},
    soundcloud_id: { type: String, required: false},
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    firstName: { type: String, default: 'N/A' },
    lastName: { type: String, default: 'N/A' },
    friends: {
        type: [String], // friends' uuid
        default: []
    }
});
module.exports =  UserSchema;