const express =require("express");
var app= new express();

var index= require("./ROUTES/index")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('views','VIEW');
app.set('view engine',"ejs");
port = process.env.PORT || 3999

app.use(express.static('STATIC'))
app.use('/', index);

app.get('/',(req,res)=>{
    res.render("mainpage")
})

app.listen(port,()=>{console.log("server started")})