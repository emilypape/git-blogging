const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
