const { rclient } = require('../utils/RedisCache');
const { MongoHandler } = require('../mongo/mongohandler');
const mongoHandller = new MongoHandler();

const SpotifyWebApi = require('spotify-web-api-node');

var router = require('express').Router();
var auth = require('../middleware/auth').auth2;

var SpotifyController = {};

//get the tracks from the Spotify API
// query - userId
router.get('/top/artists/:user_id', auth, (req, res) => {
	var userId = req.params.user_id;
	const token = req.headers.authorization.split(' ')[1];
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
	spotifyApi.getMyTopTracks()
		.then(result => {
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
});

//get the tracks from the Spotify API
router.get('/top/artists/:user_id', auth, (req, res) => {
	var userId = req.params.user_id;
	const token = req.headers.authorization.split(' ')[1];
	var spotifyApi = new SpotifyWebApi();
	spotifyApi.setAccessToken(token);
	spotifyApi.getMyTopArtists()
		.then( result => {
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
});

// @deprecated 
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

// @deprecated 
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

module.exports = router;
