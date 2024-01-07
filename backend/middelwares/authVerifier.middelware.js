const jwt = require('jsonwebtoken');

const authVerifier = async (req, res, next) => {
    try{
        const {authorization} = req.headers;
        
        
        const token = authorization && authorization?.split(" ").pop();
        if (token){
             jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data)=>{
                if(err){
                    res.status(401).json({success: false, msg: err.message});
                }else{
                    next();
                }
            });
           
        }else{
            res.status(401).json({success: false, msg: "Please login first.."})
        }
    }catch(err){
        throw err;
    }
}

module.exports = authVerifier