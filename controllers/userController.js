const userModel = require('../models/userModel');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.signup = (req,res,next)=>{
    let hashedPassword;
    bcrypt.hash(req.body.password, 10, (err, result) => {
        // if err, do something
        if(err){
            res.send('error');
            return
        }
        // otherwise, store hashedPassword in DB
        hashedPassword=result;
        const user = new userModel({username: req.body.username, password: hashedPassword, correctTestAnswers: -1});
        user.save();
        res.redirect('https://curly-braces.netlify.app/')
      });
}

exports.login = (req,res,next)=>{
    userModel.findOne({username: req.body.username},function(err,user){
    if(!user){
        console.log('------------_ERRRRROR_-------------------');
        res.redirect('https://curly-braces.netlify.app/error/2');
        return;
    }
    passport.authenticate("local", {
        successRedirect: "https://curly-braces.netlify.app/home/user-"+user._id,
        failureRedirect: "https://curly-braces.netlify.app/error/1"
    })(req,res,next)
    })
};

exports.userInfo = (req,res,next)=>{
    const id = req.params.id;
    userModel.findOne({_id: id},(err,user)=>{
        if(err)return;
        res.json(user);
    })
}
exports.test = (req,res,next)=>{
    userModel.findOne({username:'test'},function(err,user){
        if(err){
            console.log('error');
            return;
        }
        res.send(user);
    })
}