const request = require("request");
const querystring = require("querystring");

const spotify_endpoints = {
    top_tracks: "https://api.spotify.com/v1/me/top/tracks?",
    top_artists: "https://api.spotify.com/v1/me/top/artists?"
};

var SpotifyController = {};

SpotifyController.tracks = (req, res) => {
    const options = {
      url:
        spotify_endpoints.top_tracks +
        querystring.stringify(
          JSON.parse(
            JSON.stringify({
              time_range: req.query.time,
              limit: req.query.limit,
              offset: req.query.offset
            })
          )
        ),
      headers: {
        Authorization: "Bearer " + req.cookies["access_token"]
      }
    };
    request.get(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send({
          body
        });
      }
    });
};
  
SpotifyController.artists = (req, res) => {
    const options = {
      url:
        spotify_endpoints.top_artists +
        querystring.stringify(
          JSON.parse(
            JSON.stringify({
              time_range: req.query.time,
              limit: req.query.limit,
              offset: req.query.offset
            })
          )
        ),
      headers: {
        Authorization: "Bearer " + req.cookies["access_token"]
      }
    };
    request.get(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send({
          body
        });
        console.log(body);
      }
    });
};



module.exports = SpotifyController;
