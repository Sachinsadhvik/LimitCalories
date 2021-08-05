const express = require('express');
var router= express.Router();
const { RegisterUser, VerifyUser } = require('../CONTROLLER/auth')
const MemberModel = require('../MODELS/MemberModel');

var jwt = require('jsonwebtoken');
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/register',(req,res)=>{
    res.render("register",{
        message:" "
    });
})


router.get('/signin',(req,res)=>{
    res.render('signin',{
        message:" "
    })

})

router.post('/register',async (req,res)=>{
    
    var usercheck =await MemberModel.find({username: req.body.username})
    var emailcheck = await MemberModel.find({email: req.body.email})
  
    var errormessage='';
     if(usercheck.length){
         errormessage= "username already exists"
     }
     else if(req.body.email==''){
        errormessage="please enter email id"
    }
     else if(req.body.password==''){
         errormessage="please enter password"
     }
     else if(emailcheck.length){
         errormessage="emailId already exsists"
     }
     else if(req.body.username==''){
         errormessage=" user name is required"
     }
     else if(req.body.password!==req.body.confirmpassword ){
        errormessage="passwords didnt match"
     } 
     



    if(errormessage===''){
    RegisterUser(req.body).then(
()=>{
    res.redirect('/auth/signin')
}

    ).catch(e=>{
        res.end(e);
    })
}
else {
    res.render('register',{
        message: errormessage
    })
}
})



router.post('/signin',(req,res)=>{
      VerifyUser(req.body).then((user)=>{
        const payload = {
                _id: user._id,
                 username: user.username
             }
         const token = jwt.sign(payload, 'encrypt');
        res.cookie('token', token, {
                 httpOnly: true,
             	secure: false,
                 maxAge: 86400000
             });
             //res.json(token)
        res.redirect('/home')

      }).catch(()=>{
        res.render('signin',{
            message:"Please enter valid details"
        })
    })


})

router.post('/signout', (req,res)=>{
    res.clearCookie('token');
     res.redirect('/auth/signin');
})



module.exports=router;