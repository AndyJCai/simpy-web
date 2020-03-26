const mongoose = require('mongoose');
const User = require('../schemas/user');
const Follow = require('../schemas/follow');
const Post = require('../schemas/post');

class MongoHandler {
	constructor() {
		this.RECEIPT_DB_URL = 'mongodb://localhost:27017/simpy_db';
		this.client = mongoose.createConnection(this.RECEIPT_DB_URL, {
			useNewUrlParser: true,
		});
		this.UserMapping = this.client.model('Users', User);
		this.FollowMapping = this.client.model('Follows', Follow);
		this.PostMapping = this.client.model('Posts', Post);
	}

	close() {
		this.client.close();
		return;
	}

	async addNewUser(newUser) {
		this.UserMapping.create(
			{
				spotify_id: newUser.id,
				email: newUser.email,
				display_name: newUser.display_name,
			},
			function(err, small) {
				if (err) console.log(err);
			}
		);
	}

	async followUser(follower, leader) {
    var followingMapping = this.FollowMapping;
		followingMapping.find({ follow_spotify_id: follower, leader_spotify_id: leader }, function(err, docs) {
			if (docs.length) {
				console.error('Following relatinoship exists already');
			} else {
				followingMapping.create(
					{
						follow_spotify_id: follower,
						leader_spotify_id: leader,
					},
					function(err, data) {
						if (err) console.error(err);
					}
				);
			}
		});
	}

	async unfollowUser(follower, leader) {
		this.FollowMapping.findOneAndDelete(
			{
				follow_spotify_id: follower,
				leader_spotify_id: leader,
			},
			function(err, data) {
				if (err) console.log(err);
			}
		);
	}

	async queryByIDPromise(id, id_owner) {
		const simpy_users = this.client.collection('User');
		var asyncUsers = new Promise(function(resolve, reject) {
			simpy_users.find({ id_owner: id }, { _id: 0 }).toArray((err, users_with_matching_ids) => {
				if (err) throw err;
				users = [];
				users_with_matching_ids.forEach(user => {
					users.push(user);
				});
				resolve(users);
			});
		});
		return asyncUsers;
	}
}

module.exports = {
	MongoHandler,
};
