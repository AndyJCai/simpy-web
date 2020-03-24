const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsFeedSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, refer: 'User', required: true },
		post_id: { type: Schema.Types.ObjectId, refer: 'Post', required: true },
	},
	{
		collection: 'NewsFeed',
	}
);

// module.exports = mongoose.model('NewsFeed', newsFeedSchema);
module.exports = NewsFeedSchema;
