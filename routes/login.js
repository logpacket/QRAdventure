var express = require('express');
var router=express.Router();
var model = require('./model');
var filter = require('./filtering');

router.get('/', function(req, res) {
    res.render('login',{
        err:''
    });
}).post('/',function(req,res){
    model.findOne({
        number:req.body.number
    }, function(err, result){
        if(err){
            console.log('/login ERR : '+err);
            throw err
        }
        if(result){
            if(result.password === req.body.password){
                console.log('Login : '+result.username);
                req.session.number=result.number;
                req.session.solved=result.solved;
                req.session.solved1=result.solved1;
                res.redirect(req.session.preURL)
            }
            else if(result.password !== req.body.password){
                console.log('Password Error : '+result.username);
                res.render('login',{
                    err:' (Password Error)'
                });
            }
        }
        else{
            console.log("ID Error")
            res.render('login',{
                err:' (ID Error)'
            });
        }
    })
});


module.exports = router;
