const 
  request = require('request'),
	querystring = require('querystring'),
	config = require('../config/config.json'),
	{ MongoHandler } = require('../mongo/mongohandler'),
	mongoHandler = new MongoHandler(),
	client_id = config.client_id,
	client_secret = config.client_secret,
	redirect_uri = 'http://localhost:8888/callback';

var { rclient } = require('../middleware/redis_cache');

const spotify_endpoints = {
	auth: 'https://accounts.spotify.com/authorize?',
};

const generateRandomString = length => {
	var text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};

const stateKey = 'spotify_auth_state';

var UserController = {};

UserController.login = (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);
	const scope = 'user-read-private user-read-email user-top-read';
	res.redirect(
		spotify_endpoints.auth +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state,
				show_dialog: true,
			})
	);
};

UserController.callback = (req, res) => {
	const code = req.query.code || null;
	const state = req.query.state || null;
	const storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect(
			'/#' +
				querystring.stringify({
					error: 'state_mismatch',
				})
		);
	} else {
		res.clearCookie(stateKey);
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code,
				redirect_uri,
				grant_type: 'authorization_code',
			},
			headers: {
				Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64'),
			},
			json: true,
		};

		request.post(authOptions, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
					refresh_token = body.refresh_token;

				res.cookie('access_token', access_token);
				res.cookie('refresh_token', refresh_token);

				var options = {
					url: 'https://api.spotify.com/v1/me',
					headers: { Authorization: 'Bearer ' + access_token },
					json: true,
				};

				request.get(options, (error, response, body) => {
					mongoHandler.addNewUser(body);
					console.log(body);
				});

				res.redirect('/#');
			} else {
				res.redirect(
					'/#' +
						querystring.stringify({
							error: 'invalid_token',
						})
				);
			}
		});
	}
};

UserController.refresh = (req, res) => {
	const refresh_token = req.query.refresh_token;
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64'),
		},
		form: {
			grant_type: 'refresh_token',
			refresh_token,
		},

		json: true,
	};
};

UserController.follow = (req, res) => {
	var follower = req.query.follower_id;
	var leader = req.query.leader_id;

	if (!follower) {
		console.log('Undefined follower id!');
		return;
	}

	if (!leader) {
		console.log('Undefined leader id!');
		return;
	}

	mongoHandler.followUser(follower, leader);
	console.log('user ' + follower + ' followed ' + leader);
};

UserController.unfollow = (req, res) => {
	var follower = req.query.follower_id;
	var leader = req.query.leader_id;

	if (!follower) {
		console.log('Undefined follower id!');
		return;
	}
	if (!leader) {
		console.log('Undefined leader id!');
		return;
	}

	mongoHandler.unfollowUser(follower, leader);
	console.log('user ' + follower + ' unfollowed ' + leader);
};

// return a JSON of all the users that follow the current user
UserController.getFollowers = (req, res) => {
	var userid = req.params.user_id;
	mongoHandler.FollowMapping.find({ leader_spotify_id: userid })
		.select({ _id: 0, follow_spotify_id: 1 })
		.exec((err, result) => {
			if (!err && result) {
				res.send({ followers: result });
				console.log(`Retrieved followers - user ${userid}`);
			} else if (err) console.log(err);
		});
};

// return a JSON of all the users that the current user follows
UserController.getFollowings = (req, res) => {
	var userid = req.params.user_id;
	mongoHandler.FollowMapping.find({ follow_spotify_id: userid })
		.select({ _id: 0, leader_spotify_id: 1 })
		.exec((err, result) => {
			if (!err && result) {
				res.send({ followers: result });
			} else if (err) console.log(err);
		});
	console.log(`Retrieved following - user ${userid}`);
};

UserController.common_tracks = (req, res) => {
	var follower = req.query.follower_id;
	var leader = req.query.leader_id;
	var num_common = req.query.num;
};

module.exports = UserController;
