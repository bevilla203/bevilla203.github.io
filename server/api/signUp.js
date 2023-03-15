const { handleNewUser } = require('../auth/registerController');

const router = require('express').Router();


// make sign up route (requires authentication)
router.post('/signup', handleNewUser);


module.exports = router;