const express = require("express");
const router = express.Router();



router.get('/productsView', (req, res) => {
    res.render('shop/productsView', {
    })
})

module.exports = router;