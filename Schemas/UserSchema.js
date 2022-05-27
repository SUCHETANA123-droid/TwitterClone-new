const mongoose=require("mongoose")
const Schema=mongoose.Schema
const userSchema=new Schema({
  firstName:{type:String,required:true,trim:true},
  lastName:{type:String,required:true,trim:true},
  userName:{type:String,required:true,trim:true,unique:true},
  email:{type:String,required:true,trim:true,unique:true},
  password:{type:String,required:true},
  profilePic:{type:String,default:"/images/profilePic.jpeg"},
  likes:[{type:String, ref:'Post'}],
  retweets:[{type:Schema.Types.ObjectId, ref:'Post'}]
  
},{timestamps:true})

const User=mongoose.model("User",userSchema)
module.exports=User