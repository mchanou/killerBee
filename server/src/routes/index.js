 
const express = require('express');
const router = express.Router();

const userRoutes = require('../models/users');
// const authRoutes = require('./authRoutes');

router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

module.exports = router;
