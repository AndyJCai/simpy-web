const 
	axios = require('axios'),
	schedule = require('node-schedule');

const
	{ rclient } = require('../middleware/redis_cache'),
	{ Middleware } = require('../middleware/auth'),
	middleware = new Middleware(),
	{ MongoHandler } = require('../mongo/mongohandler'),
	mongoHandller = new MongoHandler();

const spotify_endpoints = {
	top_tracks: 'https://api.spotify.com/v1/me/top/tracks',
	top_artists: 'https://api.spotify.com/v1/me/top/artists',
};

var SpotifyController = {};

//get the tracks from the Spotify API
SpotifyController.tracks_api = (req, res) => {
	console.log('Retrieved top tracks from Spotify api.');
	axios
		.get(spotify_endpoints.top_tracks, {
			params: { time_range: req.query.time, limit: req.query.limit, offset: req.query.offset },
			headers: {
				Authorization: `Bearer ${req.cookies['access_token']}`,
			},
		})
		.then(result => {
			const curr_user_id = middleware.get_current_user_spotify(req); //TODO: fix 
			console.log("user id: " + curr_user_id);
			rclient.setex(`top_tracks/${curr_user_id}`, 600, JSON.stringify(result.data));
			var track_ids = [];
			result.data['items'].forEach(element => {
				track_ids.push(element['id']);
			});
			console.log(track_ids);
			mongoHandller.UserMapping.findOneAndUpdate( {spotify_id: curr_user_id}, {$set: {top_tracks: track_ids}}, {new: true, useFindAndModify: false}, (err, doc) => {
				if (err) {
					console.log("Error when updating user top tracks!");
				}
			});

			return res.send(result.data);
		})
		.catch(err => {
			console.log(err);
			return res.status(500).send({ err });
		});
};

// uses whichever redis and Spotify API is available
SpotifyController.tracks = (req, res) => {
	rclient.exists('top_tracks/' + middleware.get_current_user_spotify(req), (err, reply) => {
		if (reply == 1) {
			console.log('Retrieved top tracks from redis cache.');
			rclient.get('top_tracks/' + middleware.get_current_user_spotify(req), (err, result) => {
				res.send({ result });
			});
		} else {
			SpotifyController.tracks_api(req, res);
		}
	});
};

//get the tracks from the Spotify API
SpotifyController.artists_api = (req, res) => {
	console.log('Retrieved top artists from Spotify api.');
	axios
		.get(spotify_endpoints.top_artists, {
			params: { time_range: req.query.time, limit: req.query.limit, offset: req.query.offset },
			headers: {
				Authorization: `Bearer ${req.cookies['access_token']}`,
			},
		})
		.then(result => {
			const curr_user_id = middleware.get_current_user_spotify(req);
			rclient.setex(`top_artists/${curr_user_id}`, 600, JSON.stringify(result.data));
			var artist_ids = [];
			result.data['items'].forEach(element => {
				artist_ids.push(element['id']);
			});
			console.log(artist_ids);
			mongoHandller.UserMapping.findOneAndUpdate( {spotify_id: curr_user_id}, {$set: {top_artists: artist_ids}}, {new: true}, (err, doc) => {
				if (err) {
					console.log("Error when updating user top artists!");
				}
			});
			return res.json(result.data);
		}
		)
		.catch(err => {
			console.log(err);
			return res.status(500).send({ err });
		});
};

SpotifyController.artists = (req, res) => {
	rclient.exists('top_artists/' + middleware.get_current_user_spotify(req), (err, reply) => {
		if (reply == 1) {
			console.log('Retrieved top artists from redis cache.');
			rclient.get('top_artists/' + middleware.get_current_user_spotify(req), (err, result) => {
				res.send({ result });
			});
		} else {
			SpotifyController.artists_api(req, res);
		}
	});
};

schedule.scheduleJob('0 0 * * *', SpotifyController.tracks_api);
schedule.scheduleJob('0 0 * * *', SpotifyController.artists_api);

module.exports = SpotifyController;
