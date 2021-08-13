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




module.exports = router;