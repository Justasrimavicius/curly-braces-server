const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userModel = require('./models/userModel');

module.exports=function(passport){

    passport.serializeUser(function(user, done) {
        console.log('SERIALIZE')
        console.log(user)

        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        userModel.findById(id, function(err, user) {
        console.log('DESERIALIZE')

            console.log(user)
            done(err, user);
        });
    });
    
    passport.use(
        new LocalStrategy((username, password, done) => {
            userModel.findOne({ username: username }, (err, user) => {
                console.log(user)
            if (err) {
                console.log('error')
    
                return done(err);
            }
            if (!user) {
                console.log('username bad')
                return done(null, false, { message: "Incorrect username" });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    console.log('passwords match')
    
                    // passwords match! log user in
                    return done(null, user)
                } else {
                    // passwords do not match!
                    console.log('passwords no match')
                    return done(null, false, { message: "Incorrect password" })
                }
                })
            // return done(null, user);
            });
        })
    );
}
