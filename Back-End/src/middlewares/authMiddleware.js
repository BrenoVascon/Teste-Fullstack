const jwt = require('jsonwebtoken');
const client = require('../redis');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        client.get(`session:${user.username}`, (err, sessionData) => {
            if (err || !sessionData) {
                return res.sendStatus(403);
            }

            req.user = JSON.parse(sessionData);
            next();
        });
    });
};

module.exports = authenticateJWT;
