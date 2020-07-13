const 
	Mongoose = require('mongoose'),
	Schema = Mongoose.Schema,
	uuid = require('node-uuid'),
	mongo_type_email = require('mongoose-type-email');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			default: uuid.v4,
			unique: true,
		},
		profile_pic : {type: Array, default: []},
		spotify_id: { type: String, required: true, unique: true, immutable: true},
		email: {
			type: mongo_type_email,
			required: true,
			unique: true,
			immutable: true
		},
		display_name: { type: String, default: 'N/A' },
		top_spotify_tracks: {type: Array, default: []},
		top_spotify_artists: {type: Array, default: []},
		friends: [{ type: Schema.Types.ObjectId, ref: 'Friend'}],
		color_setting : {type: String, required: true, default: "#005073"}
	},
	{ timestamps: true, collection: 'User' }
);

// module.exports = mongoose.model('User', UserSchema);
module.exports = UserSchema;
