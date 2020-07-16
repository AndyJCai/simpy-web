const request = require('request');
const querystring = require('querystring');
const config = require('../config/config.json');

var auth = require('../middleware/auth').auth2;
var { MongoHandler } = require('../mongo/mongohandler');
var mongoHandler = new MongoHandler();

const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];
const stateKey = 'spotify_auth_state';

var router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

const CLIENT_ID = process.env.CLIENT_ID || config.client_id;
const CLIENT_SECRET = process.env.CLIENT_SECRET || config.client_secret;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/callback';

const spotifyApi = new SpotifyWebApi({
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	redirectUri: REDIRECT_URI
});

const generateRandomString = (length) => {
	var text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};

router.get('/login', (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);
	res.redirect(spotifyApi.createAuthorizeURL(scopes, state, true));
});

router.get('/callback', async (req, res) => {
	const { code, state } = req.query;
	const storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect(`http://localhost:3000/error/state mismatch`);
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
				var userBody;
				// use the access token to access the Spotify Web API
				spotifyApi
					.getMe()
					.then(({ body }) => {
						mongoHandler.addNewUser(body);
						userId = body['id'];
					})
					.then(() => {
						console.log(`usreId: ${userId}`);
						console.log(`access_token: ${access_token}`);
						console.log(`refresh_token: ${refresh_token}`);
						return res
							.status(301)
							.redirect(`http://localhost:3000/auth/${access_token}/${refresh_token}/${userId}`);
					});
			})
			.catch((err) => {
				res.redirect('http://localhost:3000/error/invalid token');
			});
	}
});

router.post('/refresh_token', (req, res) => {
	var refresh_token = req.headers.authorization.split(' ')[1];
	if (!refresh_token)
		return res.status(400).json({error: "please pass in refresh_token in order to refresh!"});
	spotifyApi.setRefreshToken(refresh_token);
	spotifyApi.refreshAccessToken().then((data) => {
		const { expires_in, access_token, refresh_token } = data.body;
		return res.status(200).json({ accessToken: access_token, refreshToken: refresh_token });
	}).catch((err) => {
		console.error(err);
		console.error("Error refreshing token!");
		return res.status(400).json({ error: "Updating refresh token failed!"});
	});
});

router.get('/test/:user_id', auth, (req, res) => {
	console.log('Got through auth!');
});

router.get('/users/:user_id', auth, (req, res) => {
	try {
		var { user_id } = req.params;
		var { want_top } = req.query;
		if (want_top == 'true') {
			const token = req.headers.authorization.split(' ')[1];
			var spotifyApi = new SpotifyWebApi();
			spotifyApi.setAccessToken(token);
			spotifyApi
				.getMyTopArtists()
				.then((result) => {
					var artist_ids = [];
					result.body['items'].forEach((element) => {
						artist_ids.push(element['id']);
					});
					console.log(artist_ids);
					mongoHandler.UserMapping.findOneAndUpdate(
						{ spotify_id: user_id },
						{ $set: { top_spotify_artists: artist_ids } },
						{ new: true },
						(err, doc) => {
							if (err) {
								console.error('Error when updating user top artists!');
							}
						}
					)
				});
			spotifyApi.getMyTopTracks().then((result) => {
					var track_ids = [];
					result.body['items'].forEach((element) => {
						track_ids.push(element['id']);
					});
					console.log(track_ids);
					mongoHandler.UserMapping.findOneAndUpdate(
						{ spotify_id: user_id },
						{ $set: { top_spotify_tracks: track_ids } },
						{ new: true, useFindAndModify: false },
						(err, doc) => {
							if (err) {
								console.error('Error updating user top tracks!');
							}
						}
					);
				});
		}
		return res.status(200).json({ userData: mongoHandler.findUserById(user_id) });
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

router.post('/users/:user_id', auth, async (req, res) => {
	var { user_id } = req.params;
	var { colorSetting, displayName, username } = req.body;
	if (colorSetting) {
		mongoHandler.UserMapping.findOneAndUpdate(
			{spotify_id: user_id},
			{ $set: {color_setting : colorSetting} },
			{ new: true, useFindAndModify: false },
			(err, doc) => {
				if (err) {
					console.error('Error updating user color settings!');
					res.status(400).json({err: "Error updating user color settings!"});
				}
			}
		);
	}

	if (displayName) {
		mongoHandler.UserMapping.findOneAndUpdate(
			{spotify_id: user_id},
			{ $set: {display_name : displayName} },
			{ new: true, useFindAndModify: false },
			(err, doc) => {
				if (err) {
					console.error('Error updating user displayed name!');
					res.status(400).json({err: "Error updating user displayed name!"});
				}
			}
		);
	}

	if (username) {
		mongoHandler.UserMapping.findOneAndUpdate(
			{spotify_id: user_id},
			{ $set: {username : username} },
			{ new: true, useFindAndModify: false },
			(err, doc) => {
				if (err) {
					console.error('Error updating user handle!');
					res.status(400).json({err: "Error updating user handle!"});
				}
			}
		);
	}

	res.status(200).json({message: "Successfully updated posted fields!"});
})

// return a JSON of all the users that the current user follows
router.get('/friends/:user_id', auth, (req, res) => {
	var { user_id } = req.params;
	let friends = mongoHandler.getUserFriends(mongoHandler.spotifyToMongoId(user_id));
	res.send({ friends: friends });
});

router.post('/friends/:user_id/add', auth, async (req, res) => {
	var requester_id = req.params.user_id;
	var { recipient_id } = req.body;
	let requester_mongoid = await mongoHandler.spotifyToMongoId(requester_id);
	let recipient_mongoid = await mongoHandler.spotifyToMongoId(recipient_id);
	mongoHandler.makeFriendRequest(requester_mongoid, recipient_mongoid);
	res.send(`user ${requester_id} made a friend request to ${recipient_id}`);
});

router.post('/friends/:user_id/reject', auth, async (req, res) => {
	var requester_id = req.params.user_id;
	var { recipient_id } = req.body;
	let requester_mongoid = await mongoHandler.spotifyToMongoId(requester_id);
	let recipient_mongoid = await mongoHandler.spotifyToMongoId(recipient_id);
	mongoHandler.rejectFriendRequest(requester_mongoid, recipient_mongoid);
	res.send(`user ${recipient_id} rejected a friend request from ${requester_id}`);
});

router.post('/friends/:user_id/accept', auth, async (req, res) => {
	var requester_id = req.params.user_id;
	var { recipient_id } = req.body;	
	let requester_mongoid = await mongoHandler.spotifyToMongoId(requester_id);
	let recipient_mongoid = await mongoHandler.spotifyToMongoId(recipient_id);
	mongoHandler.acceptFriendRequest(requester_mongoid, recipient_mongoid);
	res.send(`user ${recipient_id} accepted a friend request from ${requester_id}`);
});

module.exports = router;
