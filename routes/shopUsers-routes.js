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



router.get('/adminProfile', (req, res)=>{
    if (req.user.email != 'abodn70@hotmail.com') {
        // disallowed
     //    res.sendError(401);
        res.status(401).send("msg");

      } else {
    res.render('shopMembers/adminProfile', {
            success: req.flash('success')
    })
}
})


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/shopUsers/login');
  })

module.exports = router;