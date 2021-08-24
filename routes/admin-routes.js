const express = require("express");
const router = express.Router();
const shopUser = require("../models/shopUser")
const passport = require('passport')
const Product = require('../models/product')
const { check, validationResult } = require('express-validator');
const mngoose = require("mongoose")



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




router.get('/addProduct', (req, res) => {
    res.render('admin/addProduct', {
    })
})


router.post('/addProduct', (req,res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        res.redirect('/admin/addProduct')
    }
    
    let Pro= new Product({
        title: req.body.ProName,
        description: req.body.ProDes,
        available_stock: req.body.ProAvStk,
        price: req.body.ProPrice,
       manufacturer : req.body.ProManu

    })

    Pro.save((err)=>{
        if(!err){
            console.log("ADDED ")
      /*    res.redirect('/shops') */
        }
        else{
            console.log("error")
        }
    }) 
  })




module.exports = router;