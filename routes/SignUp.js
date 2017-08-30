var express = require('express');
var router = express.Router();
var model = require('./model');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('SignUp',{st:''});
}).post('/',function(req,res){
    user = new model({
        username: req.body.name,
        number: req.body.number,
        password: req.body.password,
        solved:0,
        solved1:0
    });
    model.findOne({
        number: req.body.number
    }, function(err, result) {
        if (err) {
            console.log("/SignUp Error : " + err);
            throw err;
        }
        if (result) {
            res.render('SignUp',{
                st:' (이미 가입된 학번입니다)'
            });
        }
        else {
            user.save(function (err) {
                if (err) {
                    console.log("User save Error");
                    throw err;
                }
                else {
                    console.log(req.body.name + " Save success");
                    res.redirect('/login');
                }
            })
        }
})});

module.exports = router;
