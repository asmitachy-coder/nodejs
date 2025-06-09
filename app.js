const express =require("express")
const app =express()
const db=require("./database/db") // importing database connection file

//const app =require("express")()
app.set("view engine","ejs")// tells express js to set environment for ejs
app.use (express.urlencoded({extended:true})) // to parse the form data
const bcrypt = require("bcrypt") // importing bcrypt for hashing passwords
// get todo - page
app.get("/", async(req,res) => {
 
res.render("home.ejs") // renders index.ejs file from views folder


})
// add todo - page
app.get("/add-todo",(req,res) => {
res.render("todo/add-todo")

})
app.get("/get-todo",async(req,res)=>{
    const datas= await db.adds.findAll()
    res.render("todo/get-todo",{ todos: datas }) // renders get-todo.ejs file from views folder
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
    if (password !== confirm_password) {
       res.send("Password and confirm password do not match")
}  
    // Create new user
//     const {username,email,password,confirm_password} = req.body
//     if (password !== confirm_password) {
//         res.send("Password and conform password do not match")
//     }
//     await db.users.create({
//         username,
//         email,
//         password 
//     })
   await db.users.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 10)
    })
     
    
 res.send("User registered successfully")
    

//console.log(req.body)
})
app.post("/add-todo",async (req,res) => {
    const {task,description,date} = req.body
    await db.adds.create({
        task: task,
        description: description,
        date: date
    })
res.render("home.ejs")
}
)
    




app.listen(3000, function (){
    console.log("Backend has started at port 3000")

})

