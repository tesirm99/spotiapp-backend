const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.ensureAuthenticated = function(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene cabecera de autenticación' });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.verify(token, process.env.JWT_SECRET, function(err, payload) {
        if(err) {
            switch(err.name) {
                case 'TokenExpiredError':
                    return res.status(401).send({ message: 'El token ha expirado' });
                case 'JsonWebTokenError':
                    return res.status(401).send({ message: 'El token no es válido', err: err });
                default:
                    return res.status(401).send(err);
            }
        } else {
            req.user = payload.sub;
            next();
        }
    });

}