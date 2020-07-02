const config = require('../config/config.json');
const Spotify = require('spotify-web-api-node');

const CLIENT_ID = process.env.CLIENT_ID || config.client_id;
const CLIENT_SECRET = process.env.CLIENT_SECRET || config.client_id;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/callback';

const spotifyApi = new Spotify({
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	redirectUri: REDIRECT_URI
});

module.exports = { spotifyApi };