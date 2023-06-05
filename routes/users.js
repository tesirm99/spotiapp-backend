var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
const ensureAuthenticated = require('../middleware/auth').ensureAuthenticated;

router.get('/getById/:id', ensureAuthenticated, authController.getUser);

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);


module.exports = router;
