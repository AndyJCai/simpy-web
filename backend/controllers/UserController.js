const request = require('request');
const Spotify = require('spotify-web-api-node');
const querystring = require('querystring');
const config = require('../config/config.json');

const { spotifyApi } = require('../util/spotifyApi');

var { MongoHandler } = require('../mongo/mongohandler');
var mongoHandler = new MongoHandler();

// const CLIENT_ID = process.env.CLIENT_ID || config.client_id;
// const CLIENT_SECRET = process.env.CLIENT_SECRET || config.client_id;
// const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/callback';

const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];
const stateKey = 'spotify_auth_state';

// const spotifyApi = new Spotify({
// 	clientId: CLIENT_ID,
// 	clientSecret: CLIENT_SECRET,
// 	redirectUri: REDIRECT_URI
//   });

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


var UserController = {};

UserController.login = (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);
	res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
};

UserController.callback = (req, res) => {
	const {code, state} = req.query;
	const storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect(
			`/#/error/state mismatch`
		);
	} else {
		res.clearCookie(stateKey);
		// Retrieve an access token and a refresh token
		spotifyApi.authorizationCodeGrant(code).then(data => {
			const { expires_in, access_token, refresh_token } = data.body;
	  
			// Set the access token on the API object to use it in later calls
			spotifyApi.setAccessToken(access_token);
			spotifyApi.setRefreshToken(refresh_token);
	  
			// use the access token to access the Spotify Web API
			spotifyApi.getMe().then(({ body }) => {
				mongoHandler.addNewUser(body);
			  	console.log(body);
			});
	  
			// we can also pass the token to the browser to make requests from there
			res.redirect(`/#/user/${access_token}/${refresh_token}`);
		}).catch( err => {
			res.redirect('/#/error/invalid token');
		});
	}
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

// return a JSON of all the users that the current user follows
UserController.getFriends = (req, res) => {
  var user_spotify_id = req.params.user_id; 
  let friends = mongoHandler.getUserFriends(mongoHandler.get_mongoid_from_spotifyid(user_spotify_id));
  res.send({friends: friends});
};

UserController.makeFriendRequest = async(req, res) => {
  var requester_id = req.query.requester_id;
  var recipient_id = req.query.recipient_id;
  let requester_mongoid = await mongoHandler.get_mongoid_from_spotifyid(requester_id);
  let recipient_mongoid = await mongoHandler.get_mongoid_from_spotifyid(recipient_id);
  mongoHandler.makeFriendRequest(requester_mongoid, recipient_mongoid);
  res.send(`user ${requester_id} made a friend request to ${recipient_id}`)
}

UserController.rejectFriendRequest = async(req, res) => {
	var requester_id = req.query.requester_id;
	var recipient_id = req.query.recipient_id;
	let requester_mongoid = await mongoHandler.get_mongoid_from_spotifyid(requester_id);
	let recipient_mongoid = await mongoHandler.get_mongoid_from_spotifyid(recipient_id);
	mongoHandler.rejectFriendRequest(requester_mongoid, recipient_mongoid);
	res.send(`user ${recipient_id} rejected a friend request from ${requester_id}`);
}

UserController.acceptFriendRequest = async(req, res) => {
	var requester_id = req.query.requester_id;
	var recipient_id = req.query.recipient_id;
	let requester_mongoid = await mongoHandler.get_mongoid_from_spotifyid(requester_id);
	let recipient_mongoid = await mongoHandler.get_mongoid_from_spotifyid(recipient_id);
	mongoHandler.acceptFriendRequest(requester_mongoid, recipient_mongoid);
	res.send(`user ${recipient_id} accepted a friend request from ${requester_id}`);
}

UserController.common_tracks = (req, res) => {
	var follower = req.query.follower_id;
	var leader = req.query.leader_id;
	var num_common = req.query.num;
};

module.exports = UserController;
