const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const config = require('./config/config.json');

const client_id = config.client_id;
const client_secret = config.client_secret;
const redirect_uri = 'http://localhost:8888/callback';

const spotify_endpoints = {
    auth: 'https://accounts.spotify.com/authorize?',
    top_tracks: 'https://api.spotify.com/v1/me/top/tracks?',
    top_artists: 'https://api.spotify.com/v1/me/top/artists?'
};

const generateRandomString = (length) => {
    var text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text;
}

const stateKey = 'spotify_auth_state';

const app = express();

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    const scope = 'user-read-private user-read-email user-top-read';
    res.redirect(spotify_endpoints.auth + 
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        })
    );
});

app.get('/logout', (req, res) => {
    res.clearCookie();
    res.sendStatus(200);
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' + 
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code,
                redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                res.cookie('access_token', access_token);
                res.cookie('refresh_token', refresh_token);

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                request.get(options, (error, response, body) => {
                    console.log(body);
                });

                res.redirect('/#' + 
                    querystring.stringify({
                        access_token,
                        refresh_token
                    }));
            } else {
                res.redirect('/#' + 
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get('/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token
        },
        
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.get('/top/tracks', (req, res) => {
    const options = {
        url: spotify_endpoints.top_tracks + querystring.stringify(JSON.parse(JSON.stringify({
            time_range: req.query.time,
            limit: req.query.limit,
            offset: req.query.offset,
        }))),
        headers: {
          'Authorization': 'Bearer ' + req.cookies['access_token'],
        }
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.send({
                body
            });
        }
    });
});


app.get('top/artists', (req, res) => {
    const options = {
        url: spotify_endpoints.top_artists + querystring.stringify(JSON.parse(JSON.stringify({
            time_range: req.query.time,
            limit: req.query.limit,
            offset: req.query.offset,
        }))),
        headers: {
          'Authorization': 'Bearer ' + req.cookies['access_token'],
        }
    };
});

app.listen(8888, () => {
    console.log('Server listening on port 8888.');
});
