const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.createToken = function(user) {
    var payload = {
        sub: user,
        iat: Date.now(),
        exp: Date.now() + 1000 * 60 * 60
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
}
