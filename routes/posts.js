const express = require ("express");
const router = express.Router();
const Post = require('../models/Posts');


//GET ALL POSTS
router.get('/', async (req,res)=>{
   try {
       const posts = await Post.find();
       res.json(posts);
   } catch (error) {
       res.json({message: error})
   }
})
router.get('/specific-post', (req,res)=>{
    res.send("<h1>We are on a specific post.</h1>");
    
})

//SUBMITS A POST
router.post('/', async (req,res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savePost = await post.save();
        res.json(savePost); 
    }
    
catch(err) {
        res.json({message: err});
        console.log(err);
    }
})


//GET A SPECIFIC POST
router.get('/:postId', async (req,res)=>{
    
    try {
        const specificPost = await Post.findById(req.params.postId); 
        res.json(specificPost);
    } catch (error) {
        res.json({message: error});
    }
   
}) 

//DELETE A SPECIFIC POST
router.delete('/:postId', async (req,res)=>{
    
    try {
        const removeSpecificPost = await Post.deleteOne({_id: req.params.postId}); 
        res.json(removeSpecificPost);
    } catch (error) {
        res.json({message: error});
    }
})


//UPDATE A POST
router.patch('/:postId', async (req,res)=>{
    
    try {
        const updateSpecificPost = await Post.updateOne({_id: req.params.postId}, {$set: {title: req.body.title }}); 
        res.json(updateSpecificPost);
    } catch (error) {
        res.json({message: error});
    }
})

module.exports = router;