const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const usersRoute= require("./users");
const authRoute=require("./auth");
const mealRoute=require("./meal");
const adminRoute= require('./admin');
var isAdmin = (req, res, next) => {
   

    if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1];
         jwt.verify(token, 'encrypt',(err, admindetails)=>{
            if (admindetails.admin) {
                console.log(admindetails)
                next();
            } else {
                res.sendStatus(403);
            }
         });
       
       
    } else {
        res.sendStatus(401);
    }
}

var MiddleAuth= (req,res,next)=>{
  if (req.headers.cookie) {
            const token = req.headers.cookie.split("=")[1];
            jwt.verify(token, 'encrypt', (err, userDetails) => {
                
                if (userDetails && userDetails.username) {
                    req.userDetails = userDetails;
                    next();
                }  else {
                    res.sendStatus(401);
                }
            });
        } else {
            res.redirect('/auth/signin');
        }
}

router.use('/meal',mealRoute);
router.use('/users',usersRoute);
router.use('/auth',authRoute);
router.use('/ad',adminRoute);
router.get("/home",MiddleAuth, (req,res)=>{
    res.render("home");
})
router.get("/adobe",isAdmin, (req,res)=>{
    res.render("home");
})


module.exports= router;