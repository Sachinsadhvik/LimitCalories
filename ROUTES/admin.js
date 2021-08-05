const express = require('express');
var router= express.Router();
var jwt = require('jsonwebtoken');
const {verifyAdmin,userList,editUser,
   deleteUser,allMeals}= require('../CONTROLLER/admin');
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

var isAdmin = (req, res, next) => {
   

    if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1];
         jwt.verify(token, 'encrypt',(err, admindetails)=>{
            if (admindetails.admin) {
                //console.log(admindetails)
                next();
            } else {
                res.sendStatus(403);
            }
         });
       
       
    } else {
        res.sendStatus(401);
    }
}

router.get('/signin', (req,res)=>{
 res.render('adminsignin',{
     message:" "
 })
})

    router.post('/signin',(req,res)=>{
        verifyAdmin(req.body).then((user)=>{
          const payload = {
                  _id: user._id,
                   username: user.username,
                   admin: true
               }
           const token = jwt.sign(payload, 'encrypt');
          res.cookie('token', token, {
                   httpOnly: true,
                   secure: false,
                   maxAge: 86400000
               });
               //res.json(token)
          res.render('adminhome')
  
        }).catch(()=>{
          res.render('adminsignin',{
              message:"Please enter valid details"
          })
      })
  
  
  })



  router.post('/signout', (req,res)=>{
    res.clearCookie('token');
     res.redirect('/ad/signin');
})

router.get('/adminhome', (req,res)=>{
    res.render('adminhome')
})

router.get('/users',isAdmin, (req,res)=>{
    userList().then((x)=>{
    res.render("userlist", {
        users: x
    })


}) })


router.get('/Meals',isAdmin, (req,res)=>{
    allMeals().then((x)=>{
    res.render("adminmeals", {
        meals: x
    })


}) })

router.post('/Meals',isAdmin, (req,res)=>{
    allMeals(req.body.date).then((x)=>{
    res.render("adminmeals", {
        meals: x
    })


}) })
router.post('/delete',isAdmin,(req,res)=>{
    
deleteUser(req.body.username).then((username)=>{
res.redirect('/ad/users')
}).catch((err)=>{
    res.redirect("back")
})
})

router.post('/edit',isAdmin,(req,res)=>{
editUser(req.body, req.body.username).then(()=>{
res.redirect('/ad/users')
}).catch((err)=>{
    res.redirect("back")

})
})


module.exports=router;