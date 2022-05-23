const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// signup
router.post('/', (req, res) => {
  // expects {username: '', email: '', password: ''}
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login
router.post('/login', async function login(req, res) {
  const dbUserData = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!dbUserData) {
    res.status(400).json({ message: 'There is no user with this username.' });
    return;
  }
  // verify user
  const validPassword = dbUserData.checkPassword(req.body.password);
  if (!validPassword) {
    res.status(400).json({ message: 'Invalid Password!' });
    return;
  }

  req.session.save(() => {
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    res.status(200).json({ message: 'Logged In!' });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(400).end();
  }
});

router.get('/', (req, res) => {
  User.findAll({
    attributes: ['id', 'username', 'email', 'password'],
  }).then((data) => res.json(data));
});

module.exports = router;
