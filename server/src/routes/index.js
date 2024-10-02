 
const express = require('express');
const router = express.Router();

// Userd
const userRoutes = require('../models/Users/users');
const addUser = require('../models/Users/addUser');
const editUser = require('../models/Users/editUser');
const removeUser = require('../models/Users/removeUser');
const findUser = require('../models/Users/findUser');

//Procede
const procedeRoutes = require('../models/Procede/procede');
const addProcede = require('../models/Procede/addProcede');
const editProcede = require('../models/Procede/editProcede');
const removeProcede = require('../models/Procede/removeProcede');
const findProcede = require('../models/Procede/findProcede');

//Ingredient
const ingredientRoutes = require('../models/Ingredient/ingredient');
const addIngredient = require('../models/Ingredient/addIngredient');
const editIngredient = require('../models/Ingredient/editIngredient');
const removeIngredient = require('../models/Ingredient/removeIngredient');
const findIngredient = require('../models/Ingredient/findIngredient');

//Freezbe
const freezbeRoutes = require('../models/Freezbe/freezbe');
const addFreezbe = require('../models/Freezbe/addFreezbe');
const editFreezbe = require('../models/Freezbe/editFreezbe');
const removeFreezbe = require('../models/Freezbe/removeFreezbe');
const findFreezbe = require('../models/Freezbe/findFreezbe');

// const authRoutes = require('./authRoutes');

router.use('/users', userRoutes);
router.use('/addUsers', addUser);
router.use('/editUsers', editUser);
router.use('/removeUsers', removeUser);
router.use('/findUsers', findUser);

router.use('/procede', procedeRoutes);
router.use('/addProcede', addProcede);
router.use('/editProcede', editProcede);
router.use('/removeProcede', removeProcede);
router.use('/findProcede', findProcede);

router.use('/ingredient', ingredientRoutes);
router.use('/addIngredient', addIngredient);
router.use('/editIngredient', editIngredient);
router.use('/removeIngredient', removeIngredient);
router.use('/findIngredient', findIngredient);

router.use('/freezbe', freezbeRoutes);
router.use('/addFreezbe', addFreezbe);
router.use('/editFreezbe', editFreezbe);
router.use('/removeFreezbe', removeFreezbe);
router.use('/findFreezbe', findFreezbe);

// router.use('/auth', authRoutes);

module.exports = router;
