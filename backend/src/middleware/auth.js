const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user");

const ensureAuth = async(req,res,next)=>{
    // console.log("Inside Auth");
    const token = req.headers['authorization'];
    console.log(token);
    if(!token){
        res.status(200).send({message:"A token is required for Authentication"});
    }
    try {   
        const decode = jwt.verify(token,config.jwt_secret);
        console.log(decode);
        const user = User.findOne({email:decode.email});
        req.user = user;
        console.log(req.user);
    }catch(error) {
        console.log(error);
        res.status(400).send({message:"Invalid Token"})
        
    }
    return next();
}
module.exports = ensureAuth;