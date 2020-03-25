// static instance for redis cache
var
    redis = require('redis'),
    port_redis = process.env.PORT || 6379,
    rclient = redis.createClient(port_redis);

rclient.on('connect', function (err, response) {
    'use strict';
    console.log("Connected to Redis database.");
});

cacheMiddleware = (key_prefix, duration) => {
    return (req, res, next) => {
        let key =  key_prefix + req.user_id;
        let cacheContent = rclient.get(key);
        if(cacheContent){
            res.send( cacheContent );
            return;
        }
        else {
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key,body,duration*1000);
                res.sendResponse(body);
            }
            next();
        }
    }
}

module.exports = {rclient, cacheMiddleware};