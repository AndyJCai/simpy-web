import mongoose from 'mongoose';

var uuid = require('node-uuid');
require('mongoose-type-email');

const user = new mongoose.Schema({
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
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    firstName: { type: String, default: 'N/A' },
    lastName: { type: String, default: 'N/A' },
    friends: {
        type: [user],
        default: []
    }

});
const User = mongoose.model('User', userSchema);
export default User;