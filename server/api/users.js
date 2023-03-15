const router = require('express').Router()
const { Users } = require('../db')


// TODO: make auth middle ware that checks if user is an admin, do refresh tokens come into play here??
router.get('/', async (req, res, next) => {
  try {
    let users;
    req.query.isAdmin === true ?
    users = await Users.findAll({
      attributes: ['fullName', 'fname', 'lname', 'email', 'isAdmin', 'isLoggedIn']
    }) : res.status(401).send('Unauthorized');
    res.send(users)
  } catch (err) {
    console.log(err);
    next(err)
  }
});

//make route with same middleware that can delete a user
// router.delete('/all/:userId', (req, res) => {
//   try{
    
//   } catch(e){

//   }
// })

module.exports = router