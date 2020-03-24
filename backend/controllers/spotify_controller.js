const request = require("request");
const querystring = require("querystring");


const redis = require('redis');
const port_redis = process.env.PORT || 5000;
var redis_client = redis.createClient();

const spotify_endpoints = {
    top_tracks: "https://api.spotify.com/v1/me/top/tracks?",
    top_artists: "https://api.spotify.com/v1/me/top/artists?"
};

var SpotifyController = {};

SpotifyController.tracks = (req, res) => {
    
    var top_tracks;
    redis_client.exists("top_tracks/" + current_user_id, (err, reply) => {
      if (reply == 1) {
        redis_client.get("top_tracks/" + current_user_id /* TODO: change to current user's id*/, (err, result) => {
          top_tracks = result;
        })
      } else {
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
        request.get(options, (error, response, top_tracks) => {
          if (!error && response.statusCode === 200) {
            res.send({
              top_tracks
            });
            redis_client.setex("top_tracks/" + current_user_id /* TODO: change to current user's id*/, 300, JSON.stringify(top_tracks)) 
          }
        });
      }
    })
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
