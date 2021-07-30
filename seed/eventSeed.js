const e = require('express')
const db = require('../config/database')
const SUser = require('../models/shopUser')

let newSUser = [
    new SUser({
        email: 'tt@hotmail.com',
        firstName: 'abod',
        lastName: 'dabor',
        userName: "abodn70",
        password: '1500a',
    }),

    new SUser({
        email: 'ss@hotmail.com',
        firstName: 'salah',
        lastName: 'dabor',
        userName: "salah70",
        password: '1500a',
    }),
]

newSUser.forEach((user)=>{
    user.save((err)=>{
        if(err){
            console.log(err);
        } else {
            console.log('added users')
        }
    })
})
/*
let event1 = new Event  ({
   title: 'eve1',
   description: 'test des1',
   location: 'Sweden',
   date: Date.now(),
})

event1.save((err)=>{
if (err){
    console.log(err)
}
else{
    console.log("rec was added")
}
})
*/