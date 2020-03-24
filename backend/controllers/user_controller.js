const request = require("request");
const querystring = require("querystring");

const config = require("../config/config.json");
const { MongoHandler } = require("../mongo/mongohandler");
const mongoHandler = new MongoHandler();

const client_id = config.client_id;
const client_secret = config.client_secret;
const redirect_uri = "http://localhost:8888/callback";

const redis = require('redis');
const port_redis = process.env.PORT || 5000;
var redis_client = redis.createClient();

const spotify_endpoints = {
  auth: "https://accounts.spotify.com/authorize?",
};

const generateRandomString = length => {
  var text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const stateKey = "spotify_auth_state";

var UserController = {};

UserController.login = (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    const scope = "user-read-private user-read-email user-top-read";
    res.redirect(
      spotify_endpoints.auth +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
          show_dialog: true
        })
    );
};

UserController.callback = (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch"
          })
      );
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code,
          redirect_uri,
          grant_type: "authorization_code"
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer(client_id + ":" + client_secret).toString("base64")
        },
        json: true
      };
  
      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
            refresh_token = body.refresh_token;
  
          res.cookie("access_token", access_token);
          res.cookie("refresh_token", refresh_token);
  
          var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true
          };
  
          request.get(options, (error, response, body) => {
            console.log(body);
            mongoHandler.addNewUser(body);
          });
  
          res.redirect("/#");
        } else {
          res.redirect(
            "/#" +
              querystring.stringify({
                error: "invalid_token"
              })
          );
        }
      });
    }
}

UserController.refresh = (req, res) => {
    const refresh_token = req.query.refresh_token;
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      form: {
        grant_type: "refresh_token",
        refresh_token
      },
  
      json: true
    }
}

UserController.follow = (req, res) => {
  var follower_id = req.query.follower;
  var leader_id = req.query.leader;
  mongoHandler.followUser(follower_id, leader_id);
  console.log("user " + follower_id + " followed " + leader_id);
}

UserController.unfollow = (req, res) => {
  var follower_id = req.query.follower;
  var leader_id = req.query.leader;
  mongoHandler.unfollowUser(follower_id, leader_id);
  console.log("user " + follower_id + " unfollowed " + leader_id);
}

UserController.common_tracks = (req, res) => {
  var follower_id = req.query.follower;
  var leader_id = req.query.leader;
  var num_common = req.query.num;
}

module.exports = UserController;