let express = require('express');
const session = require("express-session");
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let morgan = require('morgan');
require('dotenv').config();

const mongoose = require('mongoose');
const passport = require('passport');
const passportFn = require('./passport');

let leaderboardData = require('./routes/leaderboardData');
let test = require('./routes/test');
let users = require('./routes/users');
let app = express();

mongoose.connect('mongodb+srv://justasAdmin:'+process.env.MONGODB_PASSW+'@Cluster.regvrf2.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(()=>{console.log('mongoDB connected')})

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({origin:true,credentials:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
passportFn(passport);

app.use(session({ secret: "cats", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// app.use('/',(req,res,next)=>{
//     console.log('----------------')
//     console.log(req.isAuthenticated());
//     console.log(req.user);
//     next();
// })
app.get('/leaderboardData',leaderboardData);
app.use('/test',test);
app.use('/', users);

app.listen(process.env.PORT || 8080,()=>{console.log('backend listening')})

module.exports = app;
