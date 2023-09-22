const {Router} = require("express");

const {eventSignUp} = require('../user/userController');
const router = Router();

//sign up
router.post('/signup',eventSignUp);

//sign in
router.post('/signin',eventSignUp)

module.exports = router;