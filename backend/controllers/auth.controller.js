const asyncErrorHandler = require('../middelwares/errorHandlers/asyncErrorHandler');
const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const createUser = asyncErrorHandler(async (req, res) => {
    const userInfo = req.body;
    if(userInfo){
        const response = user.create(userInfo);
    res.status(200).json({success: true, msg: "user created successfully"});
    }
});

const login = asyncErrorHandler(async (req, res) => {
    const {email, password} = req.body;
   if(email && password){
    const response = await user.findOne({email: email});
    if(response?.isVerified){
        const isCorrect = await bcrypt.compare(password, response.password);
       if(isCorrect){
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({id: response._id}, secretKey, {expiresIn: "1d"});
        res.status(200).json({success: true, msg: "Login successful....", data: {AccessToken: token, id: response._id, userName: response.userName, isVerified: response.isVerified}});
       }else{
       
        const passWordError = new Error("Password don't match");
        passWordError.statusCode = 404;
        throw passWordError;
       }

    }else{
        
        const emailError = new Error("Email not found..");
        emailError.statusCode = 404;
        throw emailError;
    }
   }
});

const getUser = asyncErrorHandler(async (req, res) => {
    const {token} = req.params;
    if (token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data)=>{
           if(err){
               if(err.message === "invalid signature"){
                res.status(401).json({success: false, message: "Invalid Token"});
               }else{
                res.status(401).json({success: false, message: err.message});
               }
           }
           if(data){

               const response = await user.findById({_id: data?.id});
               res.status(200).json({success: true, message: "User fetched", data: response});
        
           }
       });
      
   }else{
    res.status(401).json({success: false, message: "Please login first.."});
   }
    
})

module.exports = {createUser, login, getUser}