const {Router} = require("express");

const {eventSignUp, eventSignIn} = require('../user/userController');
const router = Router();

//sign up
router.post('/signup',eventSignUp);

//sign in
router.post('/signin',eventSignIn)

module.exports = router;