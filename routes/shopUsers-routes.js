const express = require("express");
const router = express.Router();
const shopUser = require("../models/shopUser")
const passport = require('passport')


//Login form
router.get('/login', (req, res) => {
    res.render('shopMembers/login', {
        error: req.flash('error')

    })
})

router.post('/login',
passport.authenticate('local.login', {
    successRedirect: '/shopUsers/profile',
    failureRedirect: '/shopUsers/login',
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
    successRedirect: '/shopUsers/profile',
    failureRedirect: '/shopUsers/signup',
    failureFlash: true
}))


//profile
router.get('/profile', (req, res) => {
    res.render('shopMembers/profile', {
            success: req.flash('success')
    })
})

module.exports = router;