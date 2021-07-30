const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const SUser = require('../models/shopUser')


//saving user object in the session 
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    SUser.findById(id, function(err, user) {
      done(err, user);
    });
  });

// user signup
passport.use('local.signup', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',

    passReqToCallback: true
}, (req,username,password, done)=> {
    if (req.body.password != req.body.confirm_passwordUS) {
        return done(null, false, req.flash('error', 'Passwords not match'))
    } else {
        SUser.findOne({email: username}, (err,user)=>{
            if (err){
                return done(err)
            }
            if (user){
                return done(null, false, req.flash('error', 'Email already used'))

            }
            if (!user){
                //Creat user
                
                let newUser = new SUser()
                newUser.email= req.body.email,
                newUser.password= newUser.hashPassword(req.body.password),
                newUser.firstName= req.body.Fname,
                newUser.lastName= req.body.Lname,
                newUser.userName= req.body.UserName

              //  newUser.avatar= "user.png"
                newUser.save((err, user)=>{
                    if(!err){
                        console.log(newUser)
                        return done(null, user, req.flash('success', 'User Added'))
 
                    }
                    else{
                        console.log(err)
                    }

                })
            }
        }  )
    }

}))

//user login

passport.use('local.login', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true

},(req, username, password, done)=>{
    // find user
    SUser.findOne({email: username}, (err,user)=> {

        if (err) {
            return done(null, false, req.flash('error', 'Something wrong happened'))
        } 
        if(!user) {
            return done(null, false, req.flash('error', 'user was not found'))
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

                return done(null,user, req.flash('success', ' welcome back'))

            } else {
                return done(null,false, req.flash('error', ' password is wrong'))

            }
        }
    })
})) 




