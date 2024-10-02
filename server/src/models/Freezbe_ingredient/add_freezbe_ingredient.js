const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter une relation Freezbe-Ingredient
router.post('/', (req, res) => {
    let { IdFreezbe, IdIngredient, Grammage } = req.body;

    // Validation des données
    if (!IdFreezbe || !IdIngredient || Grammage === undefined) {
        return res.status(400).json({ message: 'Les champs IdFreezbe, IdIngredient, et Grammage sont obligatoires.' });
    }

    const query = `INSERT INTO dbo.Freezbe_ingredient (IdFreezbe, IdIngredient, Grammage) VALUES (?, ?, ?)`;
    const params = [IdFreezbe, IdIngredient, Grammage];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de la relation Freezbe-Ingredient : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de la relation Freezbe-Ingredient.' });
        }
        res.status(201).json({ message: 'Relation Freezbe-Ingredient ajoutée avec succès.' });
    });
});

module.exports = router;

