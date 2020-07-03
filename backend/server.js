const 
  express = require("express"),
  request = require("request"),
  cors = require("cors"),
  querystring = require("querystring"),
  cookieParser = require("cookie-parser"),
  path = require("path"),
  jwt = require('jsonwebtoken');

const 
  UserController = require('./controllers/UserController'),
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
  .use(express.json());

const auth = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const { userId } = req.query;

      if (spotifyApi.getAccessToken() && spotifyApi.getAccessToken() !== token) {
        throw 'Invalid Access Token!';
      } else {
        res.status(201).json({message: "YES SIRRRR GANG!"});
        next();
      }
    } catch {
      res.status(401).json({
        error: 'Invalid request!'
      });
    }
  };


app.get("/login", UserController.login);

app.get('/test', auth, (req, res) => {
  console.log('Got through auth!');
})

app.get("/callback", UserController.callback);

app.get("/top/artists", SpotifyController.artists);

app.get("/top/tracks", SpotifyController.tracks_api);

app.post("/top/common_tracks", UserController.common_tracks);

app.post("/top/tracks", SpotifyController.tracks);

app.post("/top/artists", SpotifyController.artists);

app.get("/friends/:user_id", UserController.getFriends);

app.post("/friends/add", UserController.makeFriendRequest);

// app.get("/add_friend", UserController.)


app.get(/\/*/, function(req, res) {
  res.sendFile(path.join(__dirname + "/../frontend/build/"), "index.html");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
