exports.auth = function(spotifyApi) {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            console.log(`sent in token is \n${token}`);
            console.log(`API token is ${spotifyApi.getAccessToken()}`);
            if (spotifyApi.getAccessToken() && spotifyApi.getAccessToken() == token) {
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
}