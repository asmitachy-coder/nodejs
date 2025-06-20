const express =require("express")
const app =express()
const db=require("./database/db") // importing database connection file

//const app =require("express")()
app.set("view engine","ejs")// tells express js to set environment for ejs
app.use (express.urlencoded({extended:true})) // to parse the form data
const bcrypt = require("bcrypt") // importing bcrypt for hashing passwords

const jwt = require("jsonwebtoken") // importing jsonwebtoken for authentication
const isLoggedInOrNot = require("./middleware/isloggedinOrNot")
const cookieParser = require("cookie-parser") // importing cookie-parser for handling cookies
const { where } = require("sequelize")
app.use(cookieParser()) // using cookie-parser middleware


// get todo - page
app.get("/",isLoggedInOrNot, async(req,res) => {
    const usersId = req.usersId // getting user id from request
    const datas = await db.adds.findAll({
        where: {
            userId: usersId // filtering todos by user id
        }
    })

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

app.post("/login",async (req,res) => {
    const {email,password} = req.body
   const users= await db.users.findAll({
        where: {
            email: email
        }
    })
    
    if(users.length ==0){
        res.send("not register email")

    }else{
        const ispasswordmatch = bcrypt.compareSync(password, users[0].password)
        if(ispasswordmatch){
            const token = jwt.sign({ id : users[0].id}, "thisismysecretkey",{
                expiresIn: "1d"
            })
            res.cookie("token", token)

                res.redirect("/")

            //res.send("Login successful")

        }else{
            res.send("Invalid password")
        }
    }
})

app.post("/add-todo", isLoggedInOrNot, async (req,res) => {
    const usersId = req.usersId // getting user id from request
    const {task,description,date} = req.body
    await db.adds.create({
        task: task,
        description: description,
        date: date,
        userId: usersId
    })
res.render("home.ejs")
}
)

  app.get("/edit/:id", async (req,res) => {
    const id =req.params.id // getting id from request parameters
    const todos = await db.adds.findAll({
        where:{
            id: id
        }
        
    })

    // res.send(todos)


    res.render('todo/edit.ejs',{todos:todos})
 
  }) 
  
  
  app.post("/edit/:id", async (req,res) => {
    const id = req.params.id // getting id from request parameters
    const {task,description,date} = req.body
    await db.adds.update({
        task: task,
        description: description,
        date: date,
        status: status

    },{
        where: {
            id: id
        }
    })
    res.redirect() // redirecting to get-todo page after updating
  })

    

app.listen(3000, function (){
    console.log("Backend has started at port 3000")

})

