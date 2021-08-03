const mngoose = require("mongoose")
const bcrypt = require("bcrypt-nodejs") // bcrypt is Hashing algorithm
const shopUserSchema = new mngoose.Schema({
    
    email:{
    type: String,
    required: true
    },

    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    userName:{
        type: String,
        required: true
    },

    password: {
        type: String,
        required: false
    },
    confirmed:{
        type: Boolean,
        required: false
    }
})

shopUserSchema.methods.hashPassword = (password)=> {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

shopUserSchema.methods.comparePasswords = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}
let SUser = mngoose.model('SUser', shopUserSchema, 'SUsers');

module.exports = SUser;