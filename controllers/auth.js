const mongoose = require('../db/mongo');
const user = require('../models/user');
const service = require('./service');
const bcrypt = require('bcrypt-nodejs');

module.exports.signup = function(req, res) {
    user.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
    }, function(err, user) {
        if (err) {
            res.status(400).send({ message: `Error al crear el usuario: ${err}` });
        } else {
            res.status(200).send({ token: service.createToken(user) });
        }
    });
}


module.exports.signin = function(req, res) {
    if(req.body.username && req.body.password) {
        user.findOne({ username: req.body.username }, function(err, user) {
            if (err) {
                res.status(400).send({ message: `Error: el usuario no existe.\n ${err}` });
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.status(200).send({ token: service.createToken(user) });
                } else {
                    res.status(400).send({ message: 'Usuario o contraseña incorrectos' });
                }
            }
        });
    } else {
        return res.status(400).send({ message: 'Faltan datos' });
    }
}