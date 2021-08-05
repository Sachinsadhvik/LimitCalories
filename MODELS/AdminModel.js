const Schema = require('mongoose').Schema;
const db1 = require('../DB/db')
const AdminSchema = new Schema({
    username:{type: String, required: true, unique: true},
    admin:Boolean,
    password:{ type: String, required: true}
}); 

const AdminModel = db1.model('admin',AdminSchema);
module.exports = AdminModel; 