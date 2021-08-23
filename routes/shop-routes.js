const express = require("express");
const router = express.Router();
const Product = require('../models/product')



router.get('/productsView', (req, res) => {
    res.render('shop/productsView', {
    })
})



router.get('/asusProducts', (req, res) => {
    res.render('shop/asusProducts', {
    })
})

router.get('/MSIProducts', (req, res) => {

    Product.find({'description': 'msi'},{},(err,products)=>{
        // res.json(events)
    
        let chunk = []
        let chunkSize = 3
        for(let i=0; i<products.length; i+=chunkSize){
            chunk.push(products.slice(i, chunkSize+i))
        }
        //res.json(chunk)
        res.render('shop/MSIProducts', {
            chunk: chunk,
            message: req.flash('info'),
           // total: parseInt(totalDoc),
         //   pageNo: pageNo
        })
     })
})



router.get('/razerProducts', (req, res) => {
    res.render('shop/razerProducts', {
    })
})


router.get('/:pageNo?', (req,res)=> {

    let Pro= new Product({
        title: "k",
        description: "Core I7",
        available_stock: 4,
        product_id: "1",
        price: 500,
        manufacturer :"MSI"
        
    })
    Pro.save((err)=>{
        if(!err){
            console.log("ADDED")
      /*    res.redirect('/shops') */
        }
        else{
            console.log("error")
        }
    }) 
 

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


router.get('/show/:id', (req,res)=> {
    Product.findOne({_id: req.params.id}, (err,product)=>{
        if(!err){
        res.render('shop/show', {
            product: product
        })
        }
    })
})

module.exports = router;