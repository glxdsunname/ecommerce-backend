const express = require('express');
const router = express.Router();

const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validators/auth');
const User = require('../models/user');
const { requireSignin } = require('../common-middleware/index');
const { signup, signin } = require('../controller/auth');

router.post('/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/signup', validateSignupRequest, isRequestValidated, signup);

// router.post('/profile', requireSignin, (req, res) => {
//     return res.status(200).json({message : "ok"});
// })

module.exports = router;