var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signin', authController.signin);


router.post('/signup', authController.signup);


module.exports = router;
