const express = require("express");
const router = express.Router();
const shopUser = require("../models/shopUser")
const passport = require('passport')


//Login form
router.get('/login', (req, res) => {
    res.render('shopMembers/login', {
    })
})

router.post('/login',
passport.authenticate('local.login', {
    successRedirect: '/users/profile',
    failureRedirect: '/shopMembers/login',
    failureFlash: true
}))


//Signup form
router.get('/signup', (req,res)=>{
    res.render('shopMembers/signup', {
    })
})

//Signup post req
router.post('/signup',
passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/shopMembers/signup',
    failureFlash: true
}))






module.exports = router;