const express =require("express");
var app= new express();

var index= require("./ROUTES/index")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('views','VIEW');
app.set('view engine',"ejs");


app.use(express.static('STATIC'))
app.use('/', index);

app.get('/',(req,res)=>{
    res.render("mainpage")
})

app.listen(3999,()=>{console.log("server started")})