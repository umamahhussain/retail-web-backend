const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model("Post")
const token = require('../middleware/token')

router.post('/additem', token, (req, res) => {
   
    const { caption, imageUrl } = req.body;
    console.log(req.body);
    if (!caption || !imageUrl) {
        return res.status(422).json({ error: "Please add all required fields" });
    }

    const post = new Post
        (
            {
                caption: caption,
                imageUrl: imageUrl,
                PostedBy: req.User
            }
        )

    post.save()
        .then(result => {
            res.json({ post: result })
        })
        .catch(err => {
            console.log(err)
        }
        )
})

router.get('/allposts',  (req, res) => {
    Post.find()
    .sort('-createdAt')
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        })
})


router.delete('/deletepost/:postId', token, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .then(post => {
            if (!post) {
                return res.status(422).json({ error: "Post not found" });
            }

                Post.deleteOne({ _id: post._id })
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "Internal server error" });
                    });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        });
});


module.exports = router;