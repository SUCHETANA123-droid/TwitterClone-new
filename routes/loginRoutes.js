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
app.set('view engine','pug')
app.set("views","views");

router.get("/",(req,res,next)=>{
  
  res.status(200).render("login")
})
router.post("/",async(req,res,next)=>{
  var payload=req.body
  if(req.body.LogUsername && req.body.LogPassword){
    var user= await User.findOne({
      $or:[
        {email:req.body.LogUsername },
        {userName:req.body.LogUsername }
      ]
    }).catch((err)=>{
      payload.errorMessage="Something Went Wrong"
      res.status(200).render("login",payload)
    })

    if(user!=null){
      var match= await bcrpt.compare(req.body.LogPassword,user.password)
      if(match===true){
        req.session.user=user
        return res.redirect("/")

      }
      

    }
    payload.errorMessage="Login Credentials Incorrect"
    return res.status(200).render("login",payload)



  }

  payload.errorMessage="Make sure Each field has a valid value!"
  res.status(200).render("login")
})

module.exports=router;


