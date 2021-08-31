const express = require("express");
const router = express.Router();
const shopUser = require("../models/shopUser")
const passport = require('passport')
const Product = require('../models/product')
const { check, validationResult } = require('express-validator');
const mngoose = require("mongoose")




const multer = require("multer")
//config multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/imgs')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + '.png' )
    }
  })
   
  var upload = multer({ storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
      },
    });

    var uploadMultiple = upload.fields([{ name: 'image', maxCount: 10 }, { name: 'image2', maxCount: 10 } , 
    { name: 'image3', maxCount: 10 }])




router.get('/showToEdit', (req, res) => {

    Product.find({},{},(err,products)=>{
        // res.json(events)
    
        let chunk = []
        let chunkSize = 3
        for(let i=0; i<products.length; i+=chunkSize){
            chunk.push(products.slice(i, chunkSize+i))
        }
        //res.json(chunk)
        res.render('admin/showToEdit', {
            chunk: chunk,
            message: req.flash('info'),
           // total: parseInt(totalDoc),
         //   pageNo: pageNo
        })
     })
})



router.get('/edit/:id' , (req, res) => {
    Product.findOne({_id: req.params.id}, (err,product)=>{
        if(!err){
    res.render('admin/edit', {
        product: product
    })
}
})
})


router.post('/update',upload.single('image'), (req, res)=>{
    let newObj = {
        title: req.body.ProName,
        description: req.body.ProDes,
        available_stock: req.body.ProAvStk,
        price: req.body.ProPrice,
       manufacturer : req.body.ProManu,
       proImg: req.file.filename,

    }

    let query = {_id: req.body.id}
    Product.updateOne(query, newObj, (err)=>{
        if(!err){
            req.flash('info', "The event was updated succesfuly")
            res.redirect('/shopAdmin/showToEdit')

        }
        else{
            console.log("error")
        }
    })
})


router.get('/addProduct', (req, res) => {
    res.render('admin/addProduct', {
        message: req.flash('info'),
        errors: req.flash('errors'),

    })
})


router.post('/addProduct',
/*
[
    check('title').isLength({min: 3}).withMessage('Title should be more than five'),
    check('description').isLength({min: 5}).withMessage('description should be more than five'),
    check('available_stock').isLength({min: 1}).withMessage('location should be more than five'),
    check('price').isLength({min: 1}).withMessage('The price is'),
    check('manufacturer').isLength({min: 3}).withMessage('manufacturer should be valid'),


],

*/
upload.single('image'), (req,res)=> {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        res.redirect('/shopAdmin/addProduct')
    }
    
    else {
    
    let Pro= new Product({
        title: req.body.ProName,
        description: req.body.ProDes,
        available_stock: req.body.ProAvStk,
        price: req.body.ProPrice,
       manufacturer : req.body.ProManu,
       proImg: req.file.filename,
    })

    Pro.save((err)=>{
        if(!err){
            console.log("ADDED ")
            req.flash('info', 'The Product Was Added Successfuly')
            res.redirect('/shopAdmin/addProduct')
        }
        else{
            console.log("error")
            req.flash('error', 'The Product Was not Added')
            res.redirect('/shopAdmin/addProduct')


        }
    })    }
})




module.exports = router;