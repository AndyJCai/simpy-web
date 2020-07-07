const SpotifyWebApi = require("spotify-web-api-node");

// Easy auth, not actually used 
exports.auth = async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            console.log(`sent in token is \n${token}`);
            if (token) {
              res.status(201).json({message: "YES SIRRRR GANG!"});
              next();
            } else {
              throw 'Invalid Access Token!';
            }
          } catch {
            res.status(401).json({
              error: 'Invalid request!'
            });
          }
        }

// Actual auth method used in code 
exports.auth2 = async (req, res, next) => {
  try {
    var userId = req.param.user_id;
    const token = req.headers.authorization.split(' ')[1];
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    spotifyApi
      .getMe()
      .then(({body}) => {
        if (body['id'] == userId) {
          res.status(201).json({message: "YES SIRRRR GANG!"});
          next();
        } else {
          throw 'Access Token and userId do not match up!';
        }
      })

  } catch (error) {
    res.status(401).json({
      error: 'Invalid request!'
    });
  }
}