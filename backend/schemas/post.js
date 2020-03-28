const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// check this stackoverflow forum out:
// https://stackoverflow.com/questions/1443960/how-to-implement-the-activity-stream-in-a-social-network

const PostSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //user, could be the sender
		receiver_id: { type: Schema.Types.ObjectId, ref: 'User' },
		activity_type: {
			type: Number,
			required: true,
			default: 0,
			/*
			1 - vibe check songs aka. compare top tracks between users: null
			2 - vibe check artists - source: null
			3 - system recommend song - source: track_id 
			4 - user recommend (send) song - source: track_id
		*/
		},
		source_id: { type: String }, // the record that the activity is related to, refer to above
		created_time: { type: Date, default: Date.now, required: true },
	},
	{
		collection: 'Post',
		timestamps: { type: Date, default: Date.now },
	}
);

module.exports = PostSchema;
