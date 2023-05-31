const mongoose = require('../db/mongo');
const UserSchema = require('../models/user');
const service = require('./service');
const bcrypt = require('bcrypt-nodejs');

var User = mongoose.model('User', UserSchema);

module.exports.signup = function(req, res) {
    console.log("BUENAS TARDES", req.body);

    User.find({ username: req.body.username }).then(function(users) {
        if (users.length >= 1) {
            return res.status(409).send({ message: 'El usuario ya existe' });
        } else {
            var newUser = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password)
            });
        
            newUser.save().then(function() {
                res.status(200).send({ token: service.createToken(newUser.username) });
            }).catch(function(err) {
                res.status(400).send({ message: `Error: el usuario no se ha creado.\n ${err}` });
            })
        }
    });

}


module.exports.signin = function(req, res) {

    if(req.body.username && req.body.password) {
        
        User.findOne({ username: req.body.username }).then(function(user) {
            
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).send({ token: service.createToken(user), id: user._id });
            } else {
                res.status(400).send({ message: 'Usuario o contraseña incorrectos' });
            }
        
        }).catch(function(err) {
            res.status(400).send({ message: `Error: el usuario no existe.\n ${err}` });
        });
    } else {
        return res.status(400).send({ message: 'Faltan datos' });
    }
}