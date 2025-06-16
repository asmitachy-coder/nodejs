const jwt = require("jsonwebtoken")

const isLoggedInOrNot = (req, res, next) => {
    //console.log("isLoggedInOrNot function trigger vayoooo...");
    //receeive token
    const token = req.cookies.token
    //verify token
    if (token) {
        res.send("please log in")

    }else{
    jwt.verify(token,"thisismysecretkey", 
         (error,result) =>{
            if (error){
                res.send("invalid token")
            }else{
                res.send("valid token,verifaction")

    }
    
        
    })
}

}
module.exports = isLoggedInOrNot;