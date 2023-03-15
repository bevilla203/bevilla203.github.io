// const { verifyJWT } = require('../controllers');
const { handleLogin } = require('../auth/authController');

const router = require('express').Router();


// make login route (requires authorization)
router.post('/login', handleLogin);


module.exports = router;