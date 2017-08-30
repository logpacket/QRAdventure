var express = require('express');
var router = express.Router();
var ProblemModel = require('./ProblemModel');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('InsertP.html');
}).post('/',function(req,res){
    problem = new ProblemModel({
            string:req.body.string,
            pnumber:req.body.pnumber,
            answer:req.body.answer
        });
    ProblemModel.findOne({
            pnumber:problem.pnumber
        },
        function(err,result){
            if(err){
                console.log('error'+err);
                throw err;
            }
            if(!result){
                problem.save(function(err){
                    if(err){
                        console.log("save failed"+err);
                        throw err;
                    }else {
                        console.log("save success");
                        res.json({save:'success'});
                    }
                })
            }else {
                res.json({
                    success:false,
                    reason:'Already_used_number'
                })
            }
        }
    )
});

module.exports = router;
