var request = require('request'),
	{rclient} = require('../redis_cache'),
	axios = require('axios');
	// rclient = redis.createClient(6379);

const querystring = require('querystring'),
	{ Middleware } = require('../middleware/auth'),
	middleware = new Middleware();

const spotify_endpoints = {
	top_tracks: 'https://api.spotify.com/v1/me/top/tracks?',
	top_artists: 'https://api.spotify.com/v1/me/top/artists?',
};

var SpotifyController = {};

//get the tracks from the Spotify API
SpotifyController.tracks_api = (req, res) => {
	console.log('Retrieved data from Spotify api.');
	axios
		.get(spotify_endpoints.top_tracks, {
			params: { time_range: req.query.time, limit: req.query.limit, offset: req.query.offset },
			headers: {
				Authorization: `Bearer ${req.cookies['access_token']}`,
			},
		})
		.then(result => {
			rclient.setex('top_tracks/' + middleware.get_current_user(req), 600, JSON.stringify(result.data));
			return res.send(result.data);
		})
		.catch(err => {
			console.log(err);
			return res.status(500).send({ err });
		});
};

// uses both s
SpotifyController.tracks = (req, res) => {
	rclient.exists('top_tracks/' + middleware.get_current_user(req), (err, reply) => {
		if (reply == 1) {
			console.log("Retrieved data from redis cache.");
			rclient.get('top_tracks/' + middleware.get_current_user(req), (err, result) => {
				res.send({ result });
			});
		} else {
			SpotifyController.tracks_api(req, res);
		}
	});
};

SpotifyController.artists = (req, res) => {
	rclient.exists('top_artists/' + middleware.get_current_user(req), (err, reply) => {
		if (reply == 1) {
			rclient.get(
				'top_artists/' + middleware.get_current_user(req) /* TODO: change to current user's id*/,
				(err, result) => {
					res.send({ result });
				}
			);
		} else {
			const options = {
				url:
					spotify_endpoints.top_artists +
					querystring.stringify(
						JSON.parse(
							JSON.stringify({
								time_range: req.query.time,
								limit: req.query.limit,
								offset: req.query.offset,
							})
						)
					),
				headers: {
					Authorization: 'Bearer ' + req.cookies['access_token'],
				},
			};
			request.get(options, (error, response, body) => {
				if (!error && response.statusCode === 200) {
					res.send({
						body,
					});
					rclient.setex(
						'top_artists/' + middleware.get_current_user(req) /* TODO: change to current user's id*/,
						300,
						JSON.stringify(body)
					);
				}
			});
		}
	});
};

module.exports = SpotifyController;
