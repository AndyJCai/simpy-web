const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsFeedSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, refer: 'User', required: true },
		post_id: { type: Schema.Types.ObjectId, refer: 'Post', required: true },
	},
	{
		collection: 'NewsFeed',
	}
);

var NewsFeed = (module.exports = mongoose.model('NewsFeed', newsFeedSchema));
