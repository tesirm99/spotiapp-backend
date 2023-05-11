const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.ensureAuthenticated = function(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({message: 'The request does not have the authentication header'});
    }
    const token = req.headers.authorization.split(' ')[1];
    var payload = jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
        if(err){
            switch(err.name) {
                case 'TokenExpiredError':
                    return res.status(401).send({message: 'The token has expired'});
                case 'JsonWebTokenError':
                    return res.status(401).send({message: 'The token is invalid'});
                default:
                    return res.status(401).send({message: 'The token is invalid'});

            }
        }
        console.log(payload);
        req.user = payload;
        next();
    });
}