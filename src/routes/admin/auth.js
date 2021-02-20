const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const { requireSignin } = require('../../common-middleware/index');
const { signup, signin } = require('../../controller/admin/auth');
const {validateSignupRequest, validateSigninRequest, isRequestValidated} = require('../../validators/auth');


router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/admin/signup',validateSignupRequest, isRequestValidated , signup);

router.post('/profile', requireSignin, (req, res) => {
    return res.status(200).json({message : "ok"});
})

module.exports = router;