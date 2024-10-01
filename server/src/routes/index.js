 
const express = require('express');
const router = express.Router();

const userRoutes = require('../models/Users/users');
const addUser = require('../models/Users/addUser');
const editUser = require('../models/Users/editUser');
const removeUser = require('../models/Users/removeUser');
const findUser = require('../models/Users/findUser');

// const authRoutes = require('./authRoutes');

router.use('/users', userRoutes);
router.use('/addUsers', addUser);
router.use('/editUsers', editUser);
router.use('/removeUsers', removeUser);
router.use('/findUsers', findUser);
// router.use('/auth', authRoutes);

module.exports = router;
