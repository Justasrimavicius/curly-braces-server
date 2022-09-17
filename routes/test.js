var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');
var ObjectId = require('mongodb').ObjectId;

const testAnswers = [
    ['q1','1'],
    ['q2','2'],
    ['q3','4'],
    ['q4','3'],
    ['q5','4'],
    ['q6','2'],
    ['q7','1'],
    ['q8','1'],
    ['q9','2'],
    ['q10','4'],
]
router.post('/', function(req,res,next){
    let correctAnswers = 0;
    const userAnswers = Object.keys(req.body);

        for(let i = 0; i < 11; i++){
            if(i==10){ // last field is the user id, so dont need to count it as a test answer
            console.log(req.body.userID)

                // save test answers count in users schema.
                userModel.updateOne({_id: ObjectId(`${req.body.userID}`)}, {$set:{correctTestAnswers: correctAnswers}})
                  .then(res=>{ // the document in database does not get updated if a .then() is not attached to it... what?
                  })
                // show leaderboard.
                res.redirect(`http://localhost:3000/home/user-${req.body.userID}/leaderboard`);
                return;
            }
            if(testAnswers[i][1]==userAnswers[i].charAt(userAnswers[i].length-1)){
                correctAnswers++;
            }
        }
})
module.exports = router;
