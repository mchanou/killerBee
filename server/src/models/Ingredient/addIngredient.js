const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter un ingrédient
router.post('/', (req, res) => {
    let { NomIngredient, DescriptionIngredient } = req.body;

    // Validation des données
    if (!NomIngredient || !DescriptionIngredient) {
        return res.status(400).json({ message: 'Les champs NomIngredient et DescriptionIngredient sont obligatoires.' });
    }
    
    const query = `INSERT INTO dbo.Ingredient (NomIngredient, DescriptionIngredient) VALUES (?, ?)`;
    const params = [NomIngredient, DescriptionIngredient];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de l'ingrédient : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'ingrédient.' });
        }
        res.status(201).json({ message: 'Ingrédient ajouté avec succès.', ingredientId: result.insertId });
    });
});

module.exports = router;
