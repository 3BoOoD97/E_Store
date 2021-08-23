const express = require("express");
const router = express.Router();
const shopUser = require("../models/shopUser")
const passport = require('passport')
const Product = require('../models/product')



router.get('/editProducts', (req, res) => {

    Product.find({},{},(err,products)=>{
        // res.json(events)
    
        let chunk = []
        let chunkSize = 3
        for(let i=0; i<products.length; i+=chunkSize){
            chunk.push(products.slice(i, chunkSize+i))
        }
        //res.json(chunk)
        res.render('admin/editProducts', {
            chunk: chunk,
            message: req.flash('info'),
           // total: parseInt(totalDoc),
         //   pageNo: pageNo
        })
     })
})







module.exports = router;