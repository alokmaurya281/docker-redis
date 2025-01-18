const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});


redisClient.connect().catch((err) => {
    console.error('Failed to connect to Redis:', err);
});

module.exports = redisClient;

