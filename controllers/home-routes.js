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
        postId: item.id,
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

// find a specific post and return all of the comments with the option to comment as well
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'post_content', 'createdAt'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
