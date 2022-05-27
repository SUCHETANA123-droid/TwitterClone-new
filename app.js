const express=require("express")
const colors=require('colors')
const middleware=require("./middleware")
const port=3003
const path=require('path')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('./database')
const session =require("express-session")

app.set('view engine','pug')
app.set("views","views")
const publicPath=path.join(__dirname, "public")
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(publicPath))
app.use(session({
  secret:"bbq chips",
  resave:true,
  saveUninitialized:false,
  

}))



//Rotes
const loginRoute=require('./routes/loginRoutes')
const registerRoute=require('./routes/registerRoutes')
const logoutRoute=require('./routes/logout')
//Api
const postapiRoute=require('./routes/api/posts')



app.use("/login",loginRoute)
app.use("/register",registerRoute)
app.use("/logout",logoutRoute)
app.use("/api/posts",postapiRoute)

app.get("/",middleware.requireLogin,(req,res,next)=>{
  var payLoad={
    pageTitle:"Home",
    userLoggedIn:req.session.user,
    userLoggedInJs:JSON.stringify(req.session.user)
  }
  res.status(200).render("home",payLoad)
})


const server=app.listen(port,()=>{
  console.log("Listening".rainbow +port)
})