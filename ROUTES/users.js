const express = require('express');
var router= express.Router();

router.get('/',(req,res)=>{
    res.send("welcome to user");
})








module.exports=router;