const express = require("express");
const router = express.Router();



router.get('/productsView', (req, res) => {
    res.render('shop/productsView', {
    })
})



router.get('/asusProducts', (req, res) => {
    res.render('shop/asusProducts', {
    })
})

router.get('/MSIProducts', (req, res) => {
    res.render('shop/MSIProducts', {
    })
})

router.get('/razerProducts', (req, res) => {
    res.render('shop/razerProducts', {
    })
})



module.exports = router;