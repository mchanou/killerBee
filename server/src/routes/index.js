 
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

//Etape
const etapeRoutes = require('../models/etape/etape');
const addEtape = require('../models/etape/addEtape');
const editEtape = require('../models/etape/editEtape');
const removeEtape = require('../models/etape/removeEtape');
const findEtape = require('../models/etape/findEtape');

//ProcedeEtape
const procedeEtapeRoutes = require('../models/Procede_etape/procede_etape');
const addProcedeEtape = require('../models/Procede_etape/add_procede_etape');
const editProcedeEtape = require('../models/Procede_etape/edit_procede_etape');
const removeProcedeEtape = require('../models/Procede_etape/remove_procede_etape');
const findProcedeEtape = require('../models/Procede_etape/find_procede_etape');

//FreezbeIngredient
// const freezbeIngredientRoutes = require('../models/Procede_etape/procede_etape');
const addFreezbeIngredient = require('../models/Freezbe_ingredient/add_freezbe_ingredient');
const editFreezbeIngredient = require('../models/Freezbe_ingredient/edit_freezbe_ingredient');
const removeFreezbeIngredient = require('../models/Freezbe_ingredient/remove_freezbe_ingredient');
// const findFreezbeIngredient = require('../models/Procede_etape/find_procede_etape');

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

router.use('/etape', etapeRoutes);
router.use('/addEtape', addEtape);
router.use('/editEtape', editEtape);
router.use('/removeEtape', removeEtape);
router.use('/findEtape', findEtape);

// router.use('/procede_etape', procedeEtapeRoutes);
router.use('/add_procede_etape', addProcedeEtape);
router.use('/edit_procede_etape', editProcedeEtape);
router.use('/remove_procede_etape', removeProcedeEtape);
router.use('/find_procede_etape', findProcedeEtape);

router.use('/add_freezbe_ingredient', addFreezbeIngredient);
router.use('/edit_freezbe_ingredient', editFreezbeIngredient);
router.use('/remove_freezbe_ingredient', removeFreezbeIngredient);

// router.use('/auth', authRoutes);

module.exports = router;
