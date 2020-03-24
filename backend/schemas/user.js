const mongoose = require('mongoose');
const uuid = require('node-uuid');
const mongo_type_email = require('mongoose-type-email');

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			default: uuid.v4,
			unique: true,
		},
		spotify_id: { type: String, required: true, unique: true },
		apple_id: { type: String, required: false },
		soundcloud_id: { type: String, required: false },
		email: {
			type: mongo_type_email,
			required: true,
			unique: true,
		},
		display_name: { type: String, default: 'N/A' },
	},
	{ timestamps: true, collection: 'User' }
);

// module.exports = mongoose.model('User', UserSchema);
module.exports = UserSchema;
