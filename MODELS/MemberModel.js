const Schema = require('mongoose').Schema;
//const ObjectId = Schema.ObjectId;
const db1 = require('../DB/db')
const usersSchema = new Schema({
  username:{ type: String,
    required: true},
  firstname:{ type: String},
  lastname:{type:String},
  email: {
    type: String,
    required: true,
    unique: true
},
     password: {
         type: String,
         required: true
},
calorielimit: 
        {type:Number,
         required:true
}
}); 

const UsersModel = db1.model('members',usersSchema);
module.exports = UsersModel; 