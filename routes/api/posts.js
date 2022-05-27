const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const User = require('../../Schemas/UserSchema');
const Post = require('../../Schemas/PostSchema');

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    Post.find()
    .populate("postedBy")
    .sort({ "createdAt": -1 })
    .then(results =>{
         //console.log("Result"+results)
         res.status(200).send(results)})
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
})

router.post("/", async (req, res, next) => {

    if (!req.body.content) {
        console.log("Content param not sent with request");
        return res.sendStatus(400);
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }
   

     Post.create(postData)
     .then(async newPost => {
        newPost = await User.populate(newPost, { path: "postedBy" })
        //console.log("New Post" +newPost)

        res.status(201).send(newPost);
     })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
})

router.put("/:id/like", async (req, res, next) => {

    var postId = req.params.id.trim()
    var userId = req.session.user._id

    var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    var option = isLiked ? "$pull" : "$addToSet";
    console.log(option)
    console.log(postId)
    console.log(userId)


    // Insert user like
    req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true})
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    //Insert post like
    var post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true})
    
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
     })


    res.status(200).send(post)
})

router.post("/:id/retweet", async (req, res, next) => {
    

    var postId = req.params.id.trim()
    var userId =req.session.user._id
    //try and delete retweet
    var deletedPost=await Post.findOneAndDelete({postedBy:userId,retweetData:postId})
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    // var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    var option = deletedPost!=null ? "$pull" : "$addToSet";
    var repost=deletedPost
    if(repost==null){
        repost=await Post.create({postedBy:userId,retweetData:postId})
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
    }




    
    // return res.status(200).send(option)
    console.log(option)
    console.log(postId)
    console.log(userId)


    // Insert user like
    req.session.user = await User.findByIdAndUpdate(userId, { [option]: { retweets:repost._id } }, { new: true})
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    //Insert post like
    var post = await Post.findByIdAndUpdate(postId, { [option]: { retweetUsers: userId } }, { new: true})
    
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
     })


    res.status(200).send(post)
})

module.exports = router;