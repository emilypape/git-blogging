const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// handlebars renderings
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

// homepage handlebars
router.get('/homepage', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'post_content', 'createdAt'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  }).then((dbPostData) => {
    const post = dbPostData.map((item) => {
      return {
        title: item.title,
        content: item.post_content,
        created_at: item.createdAt.toLocaleDateString(),
        username: item.user.username,
      };
    });
    res.render('homepage', {
      post,
    });
  });
});

// dashboard handlebars
router.get('/dashboard', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'post_content', 'createdAt'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  }).then((dbPostData) => {
    const post = dbPostData.map((item) => {
      return {
        title: item.title,
        content: item.post_content,
        created_at: item.createdAt.toLocaleDateString(),
        username: item.user.username,
        id: item.id,
      };
    });
    res.render('dashboard', {
      post,
    });
  });
});

// new post route
router.get('/new-post', (req, res) => {
  res.render('newPost');
});

// update or delete post
router.get('/update/:id', (req, res) => {
  Post.findAll({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'post_content'],
  }).then((dbPostData) => {
    const post = dbPostData.map((item) => {
      return {
        title: item.title,
        content: item.post_content,
        postId: req.params.id,
      };
    });
    res.render('changePost', {
      post: post[0],
    });
  });
});

module.exports = router;
