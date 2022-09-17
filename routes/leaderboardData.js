var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');

router.get('/leaderboardData', function(req,res,next){
    let correctAnswerArray = [
        ['00%',0],
        ['10%',0],
        ['20%',0],
        ['30%',0],
        ['40%',0],
        ['50%',0],
        ['60%',0],
        ['70%',0],
        ['80%',0],
        ['90%',0],
        ['100%',0],
    ]
    userModel.find({correctTestAnswers:{$gt:-1}})
      .then(users=>{
        users.forEach(element=>{

            for(let i = 0; i < correctAnswerArray.length; i++){
                if(correctAnswerArray[i][0].slice(-4,-2)==element.correctTestAnswers){
                    correctAnswerArray[i][1]+=1;
                }
            }
        })
        res.json(correctAnswerArray);
      })
})

module.exports = router;
