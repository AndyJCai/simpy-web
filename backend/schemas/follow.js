const 
	Mongoose = require('mongoose'),
	Schema = Mongoose.Schema;

const FollowSchema = new Schema(
	{
		follow_spotify_id: { type: String, required: true }, // person following
		leader_spotify_id: { type: String, required: true }, // person being followed
	},
	{ collection: 'Follow' }
);

// module.exports = mongoose.model('Follow', FollowSchema);
module.exports = FollowSchema;
