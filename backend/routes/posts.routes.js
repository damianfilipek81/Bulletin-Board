const express = require('express');
const Post = require('../models/post.model');
const path = require('path');

const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + '/../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
const upload = multer({ storage });

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ status: 'published' });
    // .select('author created title photo')
    // .sort({created: -1});
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/myPosts', async (req, res) => {
  try {
    const result = await Post.find({email: req.user._json.email});
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', upload.single('image'), async (req, res) => {
  try {
    const { filename } = req.file;
    const { title, author, description, email, price, tel, categories, creationDate, editDate, status } = req.body;
    const data = {
      title,
      author,
      description,
      email,
      price,
      tel,
      categories,
      creationDate,
      editDate,
      status,
      image: {
        data: fs.readFileSync(path.join(__dirname + '/../uploads/' + filename)),
        contentType: 'image/jpeg',
      },
    };
    const newPost = new Post(data);

    await newPost.save();
    res.json(newPost);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id/edit', async (req, res) => {
  try {
    const post = await (Post.findById(req.params.id));
    if (post) {
      const edited = await Post.updateOne({ _id: req.params.id }, { $set: req.body });
      res.json(edited);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/posts/:id/delete', async (req, res) => {

  try {
    await Post.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
      if (err) {
        res.status(404).json({ message: 'Not found...' });
      } else {
        res.json(doc);
      }
    });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
