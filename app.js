const express =require("express")
const app =express()
require("./database/db") // importing database connection file
//const app =require("express")()
app.set("view engine","ejs")// tells express js to set environment for ejs
app.get("/",function(req,res){
    let name="John Doe"
    res.render("home",{age:23,name:"John Doe"})
})
app.get("/about",function(req,res){
    res.render("hello/hi")
})
app.get("/asmita",function(req,res){
    res.render("about", {name: "about"})
})



app.listen(3000, function (){
    console.log("Backend has started at port 3000")

})

