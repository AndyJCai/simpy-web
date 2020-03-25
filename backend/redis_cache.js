// static instance for redis cache
var redis = require('redis');

class RedisMiddleware {
	constructor() {
		var port_redis = process.env.PORT || 6379,
			rclient = redis.createClient(port_redis);
		rclient.on('connect', function(err, response) {
			'use strict';
			console.log('Connected to Redis database.');
		});
	}

	cacheMiddleware = (key, duration) => {
		return (req, res, next) => {
			let cacheContent = rclient.get(key);
			if (cacheContent) {
				console.log(`Content for key ${cacheContent} exists!`);
				res.send(cacheContent);
				return;
			} else {
				console.log(`Content for key ${cacheContent} doesn't exist, using api!`);
				res.sendResponse = res.send;
				res.send = body => {
					memCache.put(key, body, duration * 1000);
					res.sendResponse(body);
				};
				next();
			}
		};
	};
}

module.exports = { RedisMiddleware };
