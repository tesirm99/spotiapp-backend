var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST Login */
router.post('/login', userController.login);

/* POST Register */
router.post('/register', userController.register);


module.exports = router;
