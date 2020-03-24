const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		creator: { type: Schema.Types.ObjectId, ref: 'User' },
		body: { type: String, required: true },
		created_at: { type: Date, default: Date.now },
	},
	{
		collection: 'Post',
	}
);

module.exports = PostSchema;
