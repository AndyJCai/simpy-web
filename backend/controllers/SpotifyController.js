const { MongoHandler } = require('../mongo/mongohandler');
const mongoHandler = new MongoHandler();

const SpotifyWebApi = require('spotify-web-api-node');

var router = require('express').Router();
var auth = require('../middleware/auth').auth2;
var intersect = require('../utils/utils');


//get the tracks from the Spotify API
// query - userId
router.get('/top/tracks/:user_id', auth, (req, res) => {
	var userId = req.params.user_id;
	const token = req.headers.authorization.split(' ')[1];
	var spotifyApi = new SpotifyWebApi();
	spotifyApi.setAccessToken(token);
	spotifyApi
		.getMyTopTracks()
		.then((result) => {
			var track_ids = [];
			result.body['items'].forEach((element) => {
				track_ids.push(element['id']);
			});
			console.log(track_ids);
			mongoHandler.UserMapping.findOneAndUpdate(
				{ spotify_id: userId },
				{ $set: { top_spotify_tracks: track_ids } },
				{ new: true, useFindAndModify: false },
				(err, doc) => {
					if (err) {
						console.log('Error updating user top tracks!');
					}
				}
			);

			return res.json(result);
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).send({ err : "Error getting user top tracks!" });
		});
});

//get the artists from the Spotify API
router.get('/top/artists/:user_id', auth, (req, res) => {
	var userId = req.params.user_id;
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
				{ spotify_id: userId },
				{ $set: { top_spotify_artists: artist_ids } },
				{ new: true },
				(err, doc) => {
					if (err) {
						console.log('Error when updating user top artists!');
					}
				}
			);
			return res.json(result);
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).send({ err });
		});
});

router.get('/common/tracks/:user_id', auth, async (req, res) => {
	var requester_id = req.params.user_id;
	var recipient_id = req.query.recipient_id;
	console.log(requester_id);
	console.log();
	// var num_common = req.query.num;
	var requester_tracks = [], recipient_tracks = [];
	await mongoHandler.UserMapping.find({ spotify_id: requester_id }, 'top_spotify_tracks', (err, doc) => {
		if (err) console.log(err);
		console.log(doc);
		requester_tracks = doc? doc : [];
	});

	await mongoHandler.UserMapping.find({ spotify_id: recipient_id }, 'top_spotify_tracks', (err, doc) => {
			if (err) console.log(err);
			console.log(doc);
			recipient_tracks = doc? doc : [];
	});

	var common_tracks = intersect(requester_tracks, recipient_tracks);
	return res.status(200).json({ common_tracks: common_tracks });
});

router.get('/common/artists/:user_id', auth, async (req, res) => {
	var requester_id = req.params.user_id;
	var recipient_id = req.query.recipient_id;
	console.log(requester_id);
	console.log();
	// var num_common = req.query.num;
	var requester_artists = [], recipient_artists = [];
	await mongoHandler.UserMapping.find({ spotify_id: requester_id }, 'top_spotify_artists', (err, doc) => {
		if (err) console.log(err);
		console.log(doc);
		requester_artists = doc? doc : [];
	});

	await mongoHandler.UserMapping.find({ spotify_id: recipient_id }, 'top_spotify_artists', (err, doc) => {
			if (err) console.log(err);
			console.log(doc);
			recipient_artists = doc? doc : [];
	});

	var common_artists = intersect(requester_artists, recipient_artists);
	return res.status(200).json({ common_artists: common_artists });
});


module.exports = router;
