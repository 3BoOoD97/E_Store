const express = require("express");
const app = express()
const db = require ('./config/database.js') //connect to database
var bodyParser = require('body-parser')
const session= require('express-session')
const flash= require('connect-flash')
const passport = require("passport");
//const passportSetup = require('./config/passport-setup')
const pSU = require('./config/pass-Suser') 
const router = express.Router();


//bring static
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('node_modules'))

//session and flash config
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 *15  }
}))
app.use(flash())

//bring passport 
app.use(passport.initialize())
app.use(passport.session())

// store user object
app.get('*', (req,res,next)=> {
  res.locals.user = req.user || null
  next()
})
//bring ejs template
app.set('view engine', 'ejs');

//bring BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.get('/', (req,res)=>{
  res.redirect('/shops')
});

/*
//bring users route
const users = require ('./routes/user-routes')
app.use('/users', users)
*/
//brin events routes
const events = require ('./routes/even-routes')
app.use('/events', events)

//bring shops routes
const shops = require ('./routes/shop-routes')
app.use('/shops', shops)


//bring shops routes
const shopUsers = require ('./routes/shopUsers-routes')
app.use('/shopUsers', shopUsers)


//bring Admin routes
const shopAdmin = require ('./routes/admin-routes')
app.use('/shopAdmin', shopAdmin)



// Since Facebook have been requiring usage of HTTPS for our redirect URIs
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'read_stream' })
);

app.get('/auth/facebook/signup', passport.authenticate('facebook'));
  passport.authenticate('facebook',{
    successRedirect: '/users/profile',
    failureRedirect: '/shopMembers/signup' })
//
//listen to port 3000
app.listen(3000, ()=>{
  console.log("port 3000")
})
