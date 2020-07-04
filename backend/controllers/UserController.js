const request = require('request');
const Spotify = require('spotify-web-api-node');
const querystring = require('querystring');
const config = require('../config/config.json');

const { spotifyApi } = require('../utils/spotifyApi');

var auth = require('../middleware/auth').auth;
var { MongoHandler } = require('../mongo/mongohandler');
var mongoHandler = new MongoHandler();

const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];
const stateKey = 'spotify_auth_state';

var express = require('express');
var router = express.Router();

const generateRandomString = (length) => {
	var text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};

var UserController = {}

router.get('/login', (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);
	res.redirect(spotifyApi.createAuthorizeURL(scopes, state, true));
});

router.get('/callback', async (req, res) => {
	const { code, state } = req.query;
	const storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect(`/#/error/state mismatch`);
	} else {
		res.clearCookie(stateKey);
		// Retrieve an access token and a refresh token
		spotifyApi
			.authorizationCodeGrant(code)
			.then((data) => {
				const { expires_in, access_token, refresh_token } = data.body;

				// Set the access token on the API object to use it in later calls
				spotifyApi.setAccessToken(access_token);
				spotifyApi.setRefreshToken(refresh_token);

				var userId;
				// use the access token to access the Spotify Web API
				spotifyApi
					.getMe()
					.then(({ body }) => {
						mongoHandler.addNewUser(body);
						userId = body['id'];
					})
					.then(() => {
						console.log(userId);
						// we can also pass the userId to the browser to make requests from there
						// res.redirect(`/home/${userId}`);
						console.log(access_token);
						return res
							.status(200)
							.json({ userId: userId, accessToken: access_token, refreshToken: refresh_token });
					});
			})
			.catch((err) => {
				res.redirect('/#/error/invalid token');
			});
	}
});

router.get('/refresh_token', (req, res) => {
	spotifyApi.refreshAccessToken().then( (data) => {
		const { expires_in, access_token, refresh_token } = data.body;
		return res.status(200).json({ accessToken: access_token, refreshToken: refresh_token });
	});
})

router.get('/test', auth(spotifyApi), (req, res) => {
	console.log('Got through auth!');
})

router.post('/friends/add', auth(spotifyApi), (req, res) => {
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
}); 

// return a JSON of all the users that the current user follows
router.get('friends/:user_id', auth(spotifyApi), (req, res) => {
	var user_spotify_id = req.params.user_id;
	let friends = mongoHandler.getUserFriends(mongoHandler.get_mongoid_from_spotifyid(user_spotify_id));
	res.send({ friends: friends });
});

router.get('friends/add', auth(spotifyApi), async (req, res) => {
	var requester_id = req.query.requester_id;
	var recipient_id = req.query.recipient_id;
	let requester_mongoid = await mongoHandler.get_mongoid_from_spotifyid(requester_id);
	let recipient_mongoid = await mongoHandler.get_mongoid_from_spotifyid(recipient_id);
	mongoHandler.makeFriendRequest(requester_mongoid, recipient_mongoid);
	res.send(`user ${requester_id} made a friend request to ${recipient_id}`);
});

router.get('friends/reject', auth(spotifyApi), async (req, res) => {
	var requester_id = req.query.requester_id;
	var recipient_id = req.query.recipient_id;
	let requester_mongoid = await mongoHandler.get_mongoid_from_spotifyid(requester_id);
	let recipient_mongoid = await mongoHandler.get_mongoid_from_spotifyid(recipient_id);
	mongoHandler.rejectFriendRequest(requester_mongoid, recipient_mongoid);
	res.send(`user ${recipient_id} rejected a friend request from ${requester_id}`);
});

router.get('friends/accept', auth(spotifyApi), async (req, res) => {
	var requester_id = req.query.requester_id;
	var recipient_id = req.query.recipient_id;
	let requester_mongoid = await mongoHandler.get_mongoid_from_spotifyid(requester_id);
	let recipient_mongoid = await mongoHandler.get_mongoid_from_spotifyid(recipient_id);
	mongoHandler.acceptFriendRequest(requester_mongoid, recipient_mongoid);
	res.send(`user ${recipient_id} accepted a friend request from ${requester_id}`);
});

router.get('top/common_tracks', auth(spotifyApi), common_tracks = (req, res) => {
	var follower = req.query.follower_id;
	var leader = req.query.leader_id;
	var num_common = req.query.num;
});

module.exports = router;
