const bcrypt = require('bcrypt');
const MealModel = require('../MODELS/MealModel');
const MemberModel = require('../MODELS/MemberModel');
createMeal=(mealDetails)=>{
    return new Promise( (resolve,reject)=>{
       const newmeal= new MealModel();
        newmeal.username= mealDetails.username;
        newmeal.mealId= mealDetails.username+mealDetails.mealId; 
        newmeal.foodname= mealDetails.foodname;
        //newmeal.datetime= new Date();
        newmeal.description= mealDetails.description;
        newmeal.calories= mealDetails.calories;
        newmeal.save(function(err, doc) {
            if (err) {return reject(newmeal);}
            else { return resolve(newmeal)}
          })
        }
        
    )
}

mealList=(username,...args)=>{
return new Promise( async(resolve,reject)=>{
    if(typeof(args[0])=='undefined'){
    x= new Date(); }else {
        x=args[0]
    }
    console.log(typeof(args[0]),x)

         meals= await MealModel.find({ $and: [{ username: username },{ datetime: { $gte: new Date(x).toISOString().slice(0,10) } } ] }).sort({ datetime: 1 })
      maxcalories= await MemberModel.find({username:username})
      let arr=[meals, maxcalories[0].calorielimit]
       if(meals){resolve(arr)}
       else{
        reject(meals);
       }      
              


})}


deleteMeal=(pmealId)=>{

    return new Promise( async(resolve,reject)=>{
       
        const meals= await MealModel.deleteOne({ mealId: pmealId })
       if(meals.n==1){
           resolve(meals)
       }
       else {
           reject(meals);
       }
      // resolve(meals)
    
    })}

editMeal=(user, mealId)=>{

        return new Promise( async(resolve,reject)=>{
            delete user.mealId, delete user.submit;
           
             if(await MealModel.findOneAndUpdate({mealId: mealId},user)){
                 resolve()
             }
             else {
                 reject();
             }
           
          
        
        })}
    


module.exports.createMeal=createMeal;
module.exports.mealList=mealList;
module.exports.deleteMeal=deleteMeal;
module.exports.editMeal=editMeal;