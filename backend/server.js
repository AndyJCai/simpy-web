const express = require("express");
const request = require("request");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const path = require("path");

const UserController = require('./controllers/user_controller');
const SpotifyController = require('./controllers/spotify_controller');


const app = express();

app
  .use(express.static(__dirname + "/../frontend/build/"))
  .use(cors())
  .use(cookieParser());

app.get("/login", UserController.login);

// app.get('/logout', (req, res) => {
//     res.clearCookie();
//     res.sendStatus(200);
// });

app.get("/callback", UserController.callback);

app.get("/refresh_token", UserController.refresh);

app.get("/top/tracks", SpotifyController.tracks);

app.get("/top/artists", SpotifyController.artists);


app.get(/\/*/, function(req, res) {
  res.sendFile(path.join(__dirname + "/../frontend/build/"), "index.html");
});

app.listen(8888, () => {
  console.log("Server listening on port 8888.");
});
