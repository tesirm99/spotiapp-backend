const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.createToken = function(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'});
}
