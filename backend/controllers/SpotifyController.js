const axios = require('axios');
const schedule = require('node-schedule');

const { rclient } = require('../util/RedisCache');
const { MongoHandler } = require('../mongo/mongohandler');
const mongoHandller = new MongoHandler();

const { spotifyApi } = require('../util/spotifyApi');

const spotify_endpoints = {
	top_tracks: 'https://api.spotify.com/v1/me/top/tracks',
	top_artists: 'https://api.spotify.com/v1/me/top/artists',
};

var SpotifyController = {};

//get the tracks from the Spotify API
// query - userId
SpotifyController.tracks_api = (req, res) => {
	var { userId } = req.query;
	console.log('Retrieved top tracks from Spotify api.');
	spotifyApi.getMyTopTracks()
		.then(result => {
			rclient.setex(`top_tracks/${userId}`, 600, result.json);
			var track_ids = [];
			result.data['items'].forEach(element => {
				track_ids.push(element['id']);
			});
			console.log(track_ids);
			mongoHandller.UserMapping.findOneAndUpdate( {spotify_id: userId}, {$set: {top_tracks: track_ids}}, {new: true, useFindAndModify: false}, (err, doc) => {
				if (err) {
					console.log("Error when updating user top tracks!");
				}
			});

			return res.json(result);
		})
		.catch(err => {
			console.log(err);
			return res.status(500).send({ err });
		});
};

// uses whichever redis and Spotify API is available
SpotifyController.tracks = (req, res) => {
	var { userId } = req.query;
	rclient.exists(`top_tracks/${userId}`, (err, reply) => {
		if (reply == 1) {
			console.log('Retrieved top tracks from redis cache.');
			rclient.get(`top_tracks/${userId}`, (err, result) => {
				res.send({ result });
			});
		} else {
			SpotifyController.tracks_api(req, res);
		}
	});
};

//get the tracks from the Spotify API
SpotifyController.artists_api = (req, res) => {
	var {userId} = req.query;
	console.log('Retrieved top artists from Spotify api.');
	spotifyApi.getMyTopArtists()
		.then( result => {
			rclient.setex(`top_artists/${userId}`, 600, result.json);
			var artist_ids = [];
			result.data['items'].forEach(element => {
				artist_ids.push(element['id']);
			});
			console.log(artist_ids);
			mongoHandller.UserMapping.findOneAndUpdate( {spotify_id: userId}, {$set: {top_artists: artist_ids}}, {new: true}, (err, doc) => {
				if (err) {
					console.log("Error when updating user top artists!");
				}
			});
			return res.json(result);
		})
		.catch(err => {
			console.log(err);
			return res.status(500).send({ err });
		});
};


SpotifyController.artists = (req, res) => {
	var { userId } = req.query;
	rclient.exists(`top_artists/${userId}`, (err, reply) => {
		if (reply == 1) {
			console.log('Retrieved top artists from redis cache.');
			rclient.get(`top_artists/${userId}`, (err, result) => {
				res.send({ result });
			});
		} else {
			SpotifyController.artists_api(req, res);
		}
	});
};

// schedule server to refresh top tracks and artists for a user 
schedule.scheduleJob('0 0 * * *', SpotifyController.tracks_api);
schedule.scheduleJob('0 0 * * *', SpotifyController.artists_api);

module.exports = SpotifyController;
