const express = require("express");
const router = express.Router();
const Product = require('../models/product')
const mngoose = require("mongoose")



router.get('/productsView', (req, res) => {
    res.render('shop/productsView', {
    })
})



router.get('/asusProducts', (req, res) => {

    Product.find({'manufacturer': 'ASUS'},{},(err,products)=>{
        res.render('shop/asusProducts', {
            products: products,
            message: req.flash('info'),
           // total: parseInt(totalDoc),
         //   pageNo: pageNo
        })
     })
})


router.get('/MSIProducts', (req, res) => {

    Product.find({'manufacturer': 'MSI'},{},(err,products)=>{
        res.render('shop/MSIProducts', {
            products: products,
            message: req.flash('info'),
     
        })
     })
})



router.get('/razerProducts', (req, res) => {

    Product.find({'manufacturer': 'RAZER'},{},(err,products)=>{
        res.render('shop/razerProducts', {
            products: products,
            message: req.flash('info'),
     
        })
     })
})







router.get('/:pageNo?', (req,res)=> {



    let pageNo = 1

    if(req.params.pageNo){
        pageNo  = parseInt(req.params.pageNo)
    }
    if(req.params.pageNo == 0){
        pageNo= 1
    }

    let q = {
        skip: 5*(pageNo-1),
        limit: 5
    }

    // find total records
    let totalDoc = 0
    Product.countDocuments({}, (err, total)=>{

    }).then((response)=>{
        totalDoc = parseInt(response)

        Product.find({},{},q,(err,products)=>{
            // res.json(events)
            let chunk = []
            let chunkSize = 3
            for(let i=0; i<products.length; i+=chunkSize){
                chunk.push(products.slice(i, chunkSize+i))
            }
            //res.json(chunk)
            res.render('shop/index', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDoc),
                pageNo: pageNo
            })
         })
    })
})



module.exports = router;