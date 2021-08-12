const AdminModel = require('../MODELS/AdminModel');
const MemberModel = require('../MODELS/MemberModel');
const MealModel = require('../MODELS/MealModel');
const bcrypt = require('bcrypt');

createAdmin=(admin)=>{
return new Promise( async(resolve,reject)=>{
    const user= new AdminModel();

     user.username= admin.username;
     user.admin=true;
     user.password= admin.password;
  user.save();
  console.log(user);
})
}


verifyAdmin=(admin)=>{
return new Promise( async(resolve,reject)=>{
    try{
    const user= await AdminModel.find({ username: admin.username});
    if(admin.password === user[0].password){
       resolve(admin)
    }
   else {
       reject(admin)
   }
    }
    catch(e){
        reject(e);
    }

    })
}

userList=()=>{
    console.log()
    return new Promise( async(resolve,reject)=>{
        try{
        const users= await MemberModel.find()
       //console.log(users)
       resolve(users)
        }
    
    catch(e){
        reject(e);
    }
    
    
    })


} 

allMeals=(date)=>{

    return new Promise( async(resolve,reject)=>{
        if(typeof(date)=='undefined'){
            x= new Date(); }else {
                x=date;
            }
                 meals= await MealModel.find({datetime: { $gte: new Date(x).toISOString().slice(0,10)}}).sort({ datetime: 1 })
      resolve(meals)
        })}
     



deleteUser=(username)=>{

    return new Promise( async(resolve,reject)=>{
       
        const users= await MemberModel.deleteOne({ username: username })
       if(users.n==1){
           resolve(users)
       }
       else {
           reject(users);
       }
      
    
    })}

editUser=(user, username)=>{

        return new Promise( async(resolve,reject)=>{
            delete user.username, delete user.submit;
           
             if(await MemberModel.findOneAndUpdate({username: username},user)){
                 resolve()
             }
             else {
                 reject();
             }
           
          
        
        })}
    



module.exports.userList=userList;
module.exports.verifyAdmin=verifyAdmin;
module.exports.editUser=editUser;
module.exports.deleteUser=deleteUser;
module.exports.allMeals=allMeals;