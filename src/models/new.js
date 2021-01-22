

const mongoose = require('mongoose');
const validator = require('validator');
const moment = require ('moment');
//const New = mongoose.model("New", {
  const newSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,    
    trim : true,  
    unique:true     
  },
  description: {
    type: String,
   
  },
  author:{
    type: String,
    trim : true,  
    required: true,
    uppercase: true,                   
  },
  date:{
    type:Date,
    trim : true,  
    //required: true,
    default:function(){
      return moment().add(2,'hour')
    }

 },
  avatar:{
    type:Buffer
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Reporter'
 }


});

  const New = mongoose.model("New", newSchema);

  module.exports = New