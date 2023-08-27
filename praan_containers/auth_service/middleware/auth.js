const jwt = require('jsonwebtoken')
const user_model = require('../models/userModel')
exports.isAuthenticateUser = async(req,res,next)=>{
    const token = req.headers.authorization
    console.log(token)
    if(!token){
        return res.status(200).json({
            status: false,
            message: "Please Login To Access This Resource"
        })
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    const user = await user_model.findOne({
        _id: decodedData.id
    })
    if(!user){
        return res.status(200).json({
            status: false,
            message: "Please Login To Access This Resource"
        })
    }
    req.user = await user_model.findOne({
        _id: decodedData.id
    })
     next()
}


exports.authorizeRole = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(200).json({
                status: false,
                message: `${req.user.role} is Not Allowed To Access This Source`
            })
        }
        next()
    }
}