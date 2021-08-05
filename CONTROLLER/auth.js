const MemberModel = require('../MODELS/MemberModel');
const bcrypt = require('bcrypt');

const RegisterUser=
     (UserDetails)=>{
        return new Promise((resolve,reject)=> {
            try{
                bcrypt.hash(UserDetails.password, 8, function(err, hash) {
                    if(err){
                        reject(e);
                    }
                    else{
                        const newUser= new MemberModel();
                        newUser.email= UserDetails.email;
                        newUser.password= hash;
                        newUser.firstname= UserDetails.firstname;
                        newUser.lastname= UserDetails.lastname;
                        newUser.username= UserDetails.username;
                        newUser.calorielimit=UserDetails.calorielimit;
                        newUser.save();
                        resolve(newUser);
                    }
                });
        
                
                }
                catch(e){
                    //console.log("errors",e);
                    //throw new ERROR('Error:',e)
                    reject(e)
                }
        })
        
        }

const VerifyUser= (UserDetails)=>{ 
     return new Promise(async (resolve,reject)=> {
        try{
            const user= await MemberModel.find({ username: UserDetails.username })
            //console.log("user",user[0].password,"userdetails",UserDetails);
           bcrypt.compare(UserDetails.password, user[0].password, function(err, result) {
            // result == true
            if(result){
                resolve(user[0]);
            } 
            else{
                reject(err);
            }  

        });
                     
        }
            catch(e){
                reject(e)
            }
    })
    
    }



module.exports.RegisterUser=RegisterUser;
module.exports.VerifyUser=VerifyUser;
