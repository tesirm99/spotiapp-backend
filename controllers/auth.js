const mongoose = require('../db/mongo');
const UserSchema = require('../models/user');
const service = require('./service');
const bcrypt = require('bcrypt-nodejs');

var User = mongoose.model('User', UserSchema);

module.exports.signup = function(req, res) {
    console.log("BUENAS TARDES", req.body);

    User.find({ email: req.body.email }).then(function(users) {
        if (users.length >= 1) {
            return res.status(409).send({ message: 'El usuario ya existe' });
        } else {
            var newUser = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password)
            });
        
            newUser.save().then(function() {
                res.status(200).send({ token: service.createToken(newUser.email) });
            }).catch(function(err) {
                res.status(400).send({ message: `Error: el usuario no se ha creado.\n ${err}` });
            })
        }
    });

}


module.exports.signin = function(req, res) {

    if(req.body.email && req.body.password) {
        
        User.findOne({ email: req.body.email }).then(function(user) {
            
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

module.exports.getUser = function(req, res) {
    User.findById(req.params.id).then(function(user) {
        res.status(200).send(user.email);
    }).catch(function(err) {
        res.status(400).send({ message: `Error: el usuario no existe.\n ${err}` });
    });
}