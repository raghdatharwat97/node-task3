const mongoose = require("mongoose");
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const reporterSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,    
      trim : true       
    },
    age: {
      default:20,        
      type: Number,
      validate(value){                 
        if (value<0){
          throw new Error ('Age must be positive number')
        }
      }
    },
    email:{
      type: String,
      required: true,
     // unique:true,
      lowercase: true,               
      validate(value){
        if( !validator.isEmail(value)){
          throw new Error('Email.is invalid')
        }
      }
    },
    password:{
      type: String,
      required: true,
      minLength : 6,
      trim: true,
      validate(value){
        if( value.toLowerCase().includes('password') ){
          throw new Error('passowrd is invalid')
        }
      }
    },
  
    tokens:[{
        token:{
          type:String,
          required:true
        }
      }],
      
    
  })

  //////////////////////////////////////////////
  // relation 

  reporterSchema.virtual('news',{
    ref:'New',
    localField:'_id',
    foreignField:'owner'
  })
  /////////////////////////////////////////////////////////////////
  reporterSchema.pre('save',async function(next){
    const user = this
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password,8)
    }
     next()
  })
  /////////////////////////////////////////////////////////////////
  eporterSchema.statics.findByCredentials = async (email,password)=>{
    const user = await Reporter.findOne({email:email})
    if(!user){
        throw new Error ('User is not Found')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error ('Password is InCorrect')
    }
    return (user)
  }
  ///////////////////////////////////////////////////////////////
  reporterSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'node-course')
       user.tokens = user.tokens.concat({token})
    await user.save()
    return token
  }


  
const Reporter = mongoose.model("Reporter", reporterSchema);
module.exports = Reporter