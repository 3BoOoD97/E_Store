const mngoose = require("mongoose")

const productSchema = new mngoose.Schema({

    title:{
    type: String,
    required: true
    },

    description: {
        type: String,
        required: true
    },

 
    available_stock: {
        type: Number,
        required: true
    },


  /*
    _id: {
        type: String,
        required: true
    },
    */
    

    price:{
        type: Number,
        required: true
    },

    
    manufacturer:{
        type: String,
        required: true
    },
 

    proImg: {
        type: String,
        required: true

    }
})

let Product = mngoose.model('Product', productSchema, 'products');
module.exports = Product;