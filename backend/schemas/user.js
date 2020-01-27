const mongoose = require('mongoose');
const uuid = require('node-uuid');
require('mongoose-type-email');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: uuid.v4,
        unique: true,
    },
    spotify_id: { type: String, required: true },
    apple_id: { type: String, required: false },
    soundcloud_id: { type: String, required: false },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    display_name: { type: String, default: 'N/A' },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friends' }]
}, { timestamps: true });

module.exports = UserSchema;