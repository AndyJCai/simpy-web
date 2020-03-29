const 
	Mongoose = require('mongoose'),
	Schema = Mongoose.Schema;

// check this stackoverflow forum out:
// https://stackoverflow.com/questions/1443960/how-to-implement-the-activity-stream-in-a-social-network

const PostSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //user, could be the sender
		receiver_id: { type: Schema.Types.ObjectId, ref: 'User' },
		activity_type: {
			type: Number,
			required: true,
			enum: [
				0, // 0 - vibe check songs aka. compare top tracks between users: null
				1, // 1 - vibe check artists - source: null
				2, // 2 - system recommend song - source: track_id 
				3 // 3 - user recommend (send) song - source: track_id
			]
		},
		source_id: { type: String }, // the record that the activity is related to, refer to above
		created_time: { type: Date, default: Date.now, required: true },
		liked_users: [{type: Schema.Types.ObjectId, ref: 'User'}]
	},
	{
		collection: 'Post',
		timestamps: true,
	}
);

module.exports = PostSchema;
