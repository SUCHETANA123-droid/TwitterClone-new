const express=require("express")
const colors=require('colors')
const app=express()
const router=express.Router()
const bodyParser=require('body-parser')
const User=require("../Schemas/UserSchema")
const bcrpt=require('bcrypt')
app.set('view engine','pug')
app.set("views","views");
app.use(bodyParser.urlencoded({extended:false}))
router.get("/",(req,res,next)=>{
  
  res.status(200).render("register")
})
router.post("/",async (req,res,next)=>{
  var firstName=req.body.firstName.trim()
  var lastName=req.body.lastName.trim()
  var userName=req.body.userName.trim()
  var email=req.body.email.trim()
  var password=req.body.password
  
  var payload=req.body
  if(firstName  &&  lastName  &&  userName  &&  email &&  password){
    var user= await User.findOne({
      $or:[
        {email},
        {userName}

      ]
    }).catch((err)=>{
      payload.errorMessage="Something Went Wrong"
      res.status(200).render("register",payload)

    })
    if(user==null){
      var data=req.body
      data.password= await bcrpt.hash(password,10)
     
      User.create(data)
      .then((user)=>{
        
        req.session.user=user
        
        return res.redirect("/")
      })
       

    }
    else{
      if(email==user.email){
        payload.errorMessage="Email Already In Use"
        res.status(200).render("register",payload)


      }
      else{
        payload.errorMessage=" userName  Already In Use"
        res.status(200).render("register",payload)

      }
    }
     

  }
  else{
    payload.errorMessage="Make Sure Each Field Has A Valid Value"
    res.status(200).render("register",payload)
  }


  
  
  //res.status(200).render("register")
})

module.exports=router;


