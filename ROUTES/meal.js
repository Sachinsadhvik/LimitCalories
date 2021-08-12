const express = require('express');
var router= express.Router();
var jwt = require('jsonwebtoken');
const {createMeal, mealList,deleteMeal, editMeal}= require('../CONTROLLER/meal');
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

var MealAuth= (req,res,next)=>{
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

  
router.get('/create',MealAuth,(req,res)=>{
    res.render("meal",{
        message: "",username: req.userDetails.username
    });
})

router.get('/list',MealAuth,(req,res)=>{
    mealList(req.userDetails.username).then((arr)=>{
    res.render("meallist", {
        meals: arr[0],
        calorielimit : arr[1]
    })


}).catch(err=>{
     res.send("error occured")
})

})

router.post('/delete',(req,res)=>{
    //console.log(req.body.mealId)
deleteMeal(req.body.mealId).then((mealId)=>{
res.redirect('/meal/list')
}).catch((err)=>{
   res.redirect('/meal/list')
})
})

router.post('/edit',(req,res)=>{
editMeal(req.body, req.body.mealId).then(()=>{
res.redirect('/meal/list')
}).catch((err)=>{
   res.redirect("/meal/list")
})
})


router.post('/create',(req,res)=>{
    if(req.body.foodname!='' || req.body.calories!='' || req.body.mealId!=''){
      createMeal(req.body).then((x)=>{
    
     res.render("meal",{
         message:"Meal added succesfully",
         username: req.body.username
     })
      }).catch((error)=>{
        res.render("meal",{
            message:"meal id already exists",
            username: req.body.username
        })
      })}
      else {
        res.render("meal",{
            message:"please enter food name and calroies details",
            username: req.body.username
        })
      }

})

router.post('/date',MealAuth,(req,res)=>{
console.log(req.userDetails, req.body)
if(req.body.date!=''){mealList(req.userDetails.username,req.body.date).then((arr)=>{
    res.render("meallist", {
        meals: arr[0],
        calorielimit : arr[1]
    })
})}
else {res.redirect("/meal/list")}
})
module.exports=router;