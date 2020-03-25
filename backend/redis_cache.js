// static instance for redis cache
var
    redis = require('redis'),
    port_redis = process.env.PORT || 5000,
    rclient = redis.createClient(port_redis);

rclient.on('connect', function (err, response) {
    'use strict';
    console.log("Connected to database");
});

module.exports = rclient;