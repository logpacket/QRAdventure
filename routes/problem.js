var express = require('express');
var router = express.Router();
var ProblemModel = require('./ProblemModel');
var model = require('./model');

var string = ['L','O','G'];
var hidden = ['H','O','S'];
function f(req, res,URL,qr,solved,n) {
    if(qr){
        var sess=req.session;
        sess.preURL='/problem/'+URL;
        if(!sess.number) res.redirect('/login');
        else {
            if(solved===3) {
                console.log('all solved');
                res.render('sangpum.html');
                sess.destroy();
            }
            else if(solved!==qr-1) res.render('ggomsu',{qr:solved+1});
            else{sess.pnumber = Math.floor(Math.random() * 3) + n;
            ProblemModel.findOne({
                pnumber:sess.pnumber
            },function(err,result){
                if(err){
                    console.log('/problem call error'+err);
                    throw err;
                }if(result){
                    problemd = result.string;
                    answerd = result.answer;
                    res.render(URL.substring(0,6),{
                        problem:problemd,
                        pnumber:sess.pnumber
                    })
                }else{
                    console.log('Do not find the problem');
                }
            });
            }
        }
    }
}
function f2(req,res,string,solved){
    if(req.body.answer===answerd) {
        if(solved===2) res.render('sangpum.html');
        res.render('answer',{
        character:string[solved]
    });
        model.findOneAndUpdate({
            number:req.session.number
        },{solved:solved+1},function(err){
            if(err){
                throw err;
            }else {
                console.log('update success');
            }
        });
        req.session.destroy(function(err){
            if(err){
                console.log('session error'+err);
                throw err;
            }
        })
    }
    else res.render('wrong_answer.html');
}
/* GET home page. */
router.get('/normal/:qr',function(req,res){
    var qr=0;
    switch(req.param('qr')){
        case'a4c8fgijkl': qr=1; break;
        case'6bPHefgTP51': qr=2; break;
        case'aLPd5fghi!kl': qr=3; break;
    }
    {f(req,res,'normal/'+req.param('qr'),qr,req.session.solved,1)}
})
    .post('/normal',function(req,res){f2(req,res,string,req.session.solved)});

router.get('/hidden/:qr',function(req,res){
    var qr=0;
    switch(req.param('qr')){
        case 'abcdeBghi8kl': qr=1; break;
        case '8b1dAfg1Ujkl': qr=2; break;
        case 'Ab04ABghUjkl': qr=3; break;
    }
    f(req,res,'hidden/'+req.param('qr'),qr,req.session.solved1,15);
}).post('/hidden',function(req,res){f2(req,res,hidden,req.session.solved1)});


module.exports = router;
