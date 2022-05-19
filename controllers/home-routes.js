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

module.exports = router;
