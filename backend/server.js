const 
  express = require("express"),
  request = require("request"),
  cors = require("cors"),
  querystring = require("querystring"),
  cookieParser = require("cookie-parser"),
  path = require("path"),
  jwt = require('jsonwebtoken');

const 
  SpotifyController = require('./controllers/SpotifyController'),
  MongoHandler = require('./mongo/mongohandler');

const { spotifyApi } = require('./utils/SpotifyApi');

const PORT = process.env.PORT || 8888;

const app = express();

app
  .use(express.static(__dirname + "/../frontend/build/"))
  .use(cors())
  .use(cookieParser())
  .use(express.urlencoded())
  .use(express.json())
  .use(require('./controllers/UserController')) // UserController router
  .use(require('./controllers/SpotifyController')); //SpotifyController router


// app.get("/top/artists", SpotifyController.artists);

// app.get("/top/tracks", SpotifyController.tracks_api);

// app.post("/top/common_tracks", UserController.common_tracks);

// app.post("/top/tracks", SpotifyController.tracks);

// app.post("/top/artists", SpotifyController.artists);

// app.get("/friends/:user_id", UserController.getFriends);

// app.post("/friends/add", UserController.makeFriendRequest);

// app.get("/add_friend", UserController.)


app.get(/\/*/, function(req, res) {
  res.sendFile(path.join(__dirname + "/../frontend/build/"), "index.html");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
