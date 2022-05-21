const express=require("express")
const colors=require('colors')
const middleware=require("./middleware")
const port=3003
const app=express()
app.set('view engine','pug')
app.set("views","views")
//Rotes
const loginRoute=require('./routes/loginRoutes')

app.use("/login",loginRoute)
app.get("/",middleware.requireLogin,(req,res,next)=>{
  var payLoad={
    pageTitle:"home"
  }
  res.status(200).render("home",payLoad)
})


const server=app.listen(port,()=>{
  console.log("Listening".rainbow +port)
})