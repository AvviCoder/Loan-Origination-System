// Here the middlewares will be present

const jwt = require("jsonwebtoken");

const verifyToken = async(req, res, next) =>{
    const Token = req.header('Authorization');

    if(!Token)
    {
        res.json({
            message:"No token found",
        })
    }
    try{
     const decode = jwt.verify(Token, 'secretKey');
     req.user = decode; // to check whether the req is sent by a admin or not
     next();   // to move to the next middleware or utility function.
    }catch(error)
    {
     console.error(error);
     res.json({
        message:"Invalid token provided",
     })
    }
};

const verifyAdmin = async(req,res,next)=>{
    verifyToken(req,res, () =>{
        if(req.user.isAdmin){ // through the added decode above the role is getting checked 
            next();
        }
        else{
            res.json({
                message:"Access denied, Admins are only allowed",
            })
        }
    })
}

module.exports = {verifyAdmin, verifyToken};
