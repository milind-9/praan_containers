const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true,'Please Enter Email Id'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter valid Email']
    },
    password:{
        type: String,
        required:[true,'Please Enter Your Password']
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
   
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

})
module.exports = mongoose.model("User",userSchema)