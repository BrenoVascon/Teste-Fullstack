const redis = require('redis');
const client = redis.createClient();

// Conectando ao Redis
client.connect().catch(console.error);

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Exporta o cliente Redis
module.exports = client;
