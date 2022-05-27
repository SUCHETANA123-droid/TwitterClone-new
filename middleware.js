exports.requireLogin=(req,res,next)=>{
  if(req.session && req.session.user){
    console.log(req.session)
    console.log(req.session.user)
    return next();
  }
  else{
    return res.redirect('/login')
  }
}