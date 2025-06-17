const { request } = require("express")
const jwt = require("jsonwebtoken")

const isLoggedInOrNot = (req, res, next) => {
    //receeive token
    const token = req.cookies.token
    console.log(token);
    console.log("isLoggedInOrNot function trigger vayoooo...");


    //verify token
    if (!token) {
        res.send("please log in")

    }else{
    jwt.verify(token,"thisismysecretkey", 
         (error,result) =>{
            if (error){
                res.send("invalid token")
            }else{
                req.usersId =result.id
                console.log(result)
              next()

    }    
    })
}

}
module.exports = isLoggedInOrNot;