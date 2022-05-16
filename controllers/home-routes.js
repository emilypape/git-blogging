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
    attributes: ['id', 'title', 'created_at'],
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
        created_at: item.created_at,
        username: item.username,
      };
    });
    res.render('homepage', {
      post,
    });
  });
});

module.exports = router;
