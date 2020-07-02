// static instance for redis cache
var
    redis = require('redis'),
    PORT_REDIS = process.env.PORT || 6379,
    rclient = redis.createClient(PORT_REDIS);

rclient.on('connect', function (err, response) {
    'use strict';
    console.log("Connected to Redis database.");
});

// cacheMiddleware = (key_prefix, duration) => {
//     return (req, res, next) => {
//         console.log(`user_id is ${req.user_id}`);
//         let key = `${key_prefix}${req.user_id}`;
//         let cacheContent = rclient.get(key);
//         if(cacheContent){
//             console.log(`Content for key ${cacheContent} exists!`);
//             res.send( cacheContent );
//             return;
//         }
//         else {
//             console.log(`Content for key ${cacheContent} doesn't exist, using api!`);
//             res.sendResponse = res.send
//             res.send = (body) => {
//                 memCache.put(key,body,duration*1000);
//                 res.sendResponse(body);
//             }
//             next();
//         }
//     }
// }

module.exports = {rclient};