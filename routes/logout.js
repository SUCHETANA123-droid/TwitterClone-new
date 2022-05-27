const express=require("express")
const colors=require('colors')
const app=express()
const router=express.Router()
const bodyParser=require('body-parser')
const User=require("../Schemas/UserSchema")
const bcrpt=require('bcrypt')
const { findOne } = require("../Schemas/UserSchema")
const { asyncReap } = require("session-file-store/lib/session-file-helpers")

app.use(bodyParser.urlencoded({extended:false}))

router.get("/",(req,res,next)=>{
  if(req.session){
    req.session.destroy(()=>{
      res.redirect("/login")

    })
  }
  
 
})

module.exports=router;
