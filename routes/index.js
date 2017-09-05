var express = require('express');
var router = express.Router();
var User= require('../models/user');
var session = require('express-session');
var Service=require('../service/intervalService');
var JwtToken=require('../service/jwtToken');
var PingData = require('../models/pingData');
var Token = require('../models/tokenData');
var jwt =require('jsonwebtoken');
var app = express();
/* GET home page. */
// router.get('/', function(req, res, next) {
//   request('http://api.telegram.org/bot'+tokenId+'/getupdates', function (error, response, body) {
//     console.log(body);
//     res.render('index',{title:body})
// });
// });
//get setting page
router.get('/setting', function(req, res, next) {
    if(req.session.user){
    res.render('setting',{title:"Set Following Info"})
    }
    else{
        res.render('index');
    }
});

router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('home')
    }
    else{
        res.render('index')
    }

});
router.get('/home', function(req, res, next) {
    if(req.session.user){
           res.render('home');
        }
        else{
            res.render('index')
        }
     
    });


router.get('/pingSetting',function(req,res){
    if(req.session.user){
    res.render('pingPage')
}
else{
    res.render('index')
}

})


router.get('/register',function(req,res){
    if(req.session.user){ 
    res.render('home')
}
else{
    res.render('register')
}
    
})

router.get('/logout',function(req,res){
    if(req.session.user){ 
    req.session.user=null;
    JwtToken.logout();
    res.render('index');
}

    
})


// router.post('/sendMessage',function(req,res,next){
// var id=req.body.id;
// var message=req.body.message;
// console.log(id);
// console.log(message);
//   request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+id+'&text='+message, function (error, response, body) {
//    // console.log(body);
//     res.render('index',{title:body})
// });

// });

router.post('/login',function(req,res){

    User.getUserByUsername(req.body.userName,function(err,user){
        if(!user){
          res.json({"errorcode":1})
        } 
        else{
            User.comparePassword(req.body.password, user.password, function(err, isMatch){
          
            if(!isMatch){
              res.json({"errorcode":1})
            }
            if(isMatch){

                data={
                    user_id:user._id,
                    userName:user.userName
                }
                req.session.user =data;
                JwtToken.authenticate(data,function(result){
                    results={
                     id:user._id,
                     token:result
                    }
                    //console.log(req.session);
                    //console.log(data);
                    res.json(results)
                })
            
          }
            
          }
      )}
    })

});


router.post('/register',function(req,res){

    var user = new User({
        userName: req.body.userName,
        password: req.body.password
    });
    User.createUser(user, function(err, user){
        if(err){
            res.json({"errorcode":1})
        }
        else{
            res.json({"errorcode":0})
        }
    });
    
});





module.exports = router;