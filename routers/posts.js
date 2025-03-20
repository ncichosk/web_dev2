const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

// Post - requires authentification
router.post('/', verifyToken, async (req, res) => {
    try {
        console.log(req.user);

        const postData = new Post({
            title: req.body.title,
            description: req.body.description,
            createdBy: new mongoose.Types.ObjectId(req.user)
        });

        const postToSave = await postData.save();
        res.status(201).json(postToSave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/:postId/like', verifyToken, async(req,res) =>{
    try{
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes += 1;
        await post.save();

        res.status(200).json({ message: 'Post liked!', likes: post.likes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Get all posts - publicly availabe
router.get('/', async(req,res) =>{
    try{
        const post = await Post.find()
        res.send(post)
    }catch{
        res.status(400).send({message:err})
    }
})

// Get by post ID - publicly available
router.get('/:postId', async(req,res) =>{
    try{
        const post = await Post.findById(req.params.postId)
        res.send(post)
    }catch(err){
        res.send({message:err})
    }
})

router.patch('/:postId', verifyToken, async(req,res) => {
    const post = await Post.findById(req.params.postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    user = new mongoose.Types.ObjectId(req.user)
    if (!post.createdBy.equals(user)) {
        return res.status(403).json({ message: 'Not authorized to modify this post' });
    }
    try{
        const updatePost = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                title:req.body.title,
                description:req.body.description
                }
            })
        res.send(updatePost)
    }catch(err){
        res.send({message:err})
    }
})

router.delete('/:postId', verifyToken, async(req,res) =>{
    const post = await Post.findById(req.params.postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    user = new mongoose.Types.ObjectId(req.user)
    if (!post.createdBy.equals(user)) {
        return res.status(403).json({ message: 'Not authorized to modify this post' });
    }
    try{
        const deletePost = await Post.deleteOne(
            {_id:req.params.postId}
        )
        res.send(deletePost)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router