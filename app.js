const express =require("express")
const app =express()
const db=require("./database/db") // importing database connection file

//const app =require("express")()
app.set("view engine","ejs")// tells express js to set environment for ejs
app.use (express.urlencoded({extended:true})) // to parse the form data
// get todo - page
app.get("/",(req,res) => {
res.render("todo/get-todo.ejs") // renders index.ejs file from views folder


})
// add todo - page
app.get("/add-todo",(req,res) => {
res.render("todo/add-todo")

})
// update todo page
app.get("/update-todo",(req,res) => {

res.render("todo/update-todo")
})
// login page
app.get("/login-page",(req,res) => {
    res.render("authentication/login")


})
// register page
app.get("/Register",(req,res) => {
    res.render("authentication/register") // renders register.ejs file from views folder


}) 
app.post ('/register',async (req,res) =>{
    const {username,email,password,confirm_password} = req.body
//     const {username,email,password,confirm_password} = req.body
//     if (password !== confirm_password) {
//         res.send("Password and conform password do not match")
//     }
//     await db.users.create({
//         username,
//         email,
//         password 
//     })
 res.send("User registered successfully")
    

//console.log(req.body)
})
    




app.listen(3000, function (){
    console.log("Backend has started at port 3000")

})

