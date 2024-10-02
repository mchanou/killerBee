const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour mettre à jour un ingrédient par ID
router.put('/:id', (req, res) => {
    const ingredientId = parseInt(req.params.id, 10);
    const { NomIngredient, DescriptionIngredient } = req.body;

    // Vérification de la validité de l'ID
    if (isNaN(ingredientId) || ingredientId <= 0) {
        return res.status(400).json({ message: 'ID d\'ingrédient invalide.' });
    }

    // Validation des données
    if (!NomIngredient || !DescriptionIngredient) {
        return res.status(400).json({ message: 'Les champs NomIngredient et DescriptionIngredient sont obligatoires.' });
    }

    // Vérifier si l'ingrédient existe
    const queryCheck = `SELECT * FROM Ingredient WHERE IdIngredient = ?`; 

    sql.query(connectionString, queryCheck, [ingredientId], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la vérification de l'ingrédient : ", err);
            return res.status(500).json({ message: 'Erreur lors de la vérification de l\'ingrédient.' });
        }

        // Vérification si l'ingrédient n'existe pas
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Ingrédient non trouvé.' });
        }

        // Si l'ingrédient existe, procéder à la mise à jour
        const queryUpdate = `UPDATE Ingredient SET NomIngredient = ?, DescriptionIngredient = ? WHERE IdIngredient = ?`;
        const params = [NomIngredient, DescriptionIngredient, ingredientId];

        sql.query(connectionString, queryUpdate, params, (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour de l'ingrédient : ", err);
                return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'ingrédient.' });
            }

            // Vérifier le nombre de lignes affectées
            if (result.rowsAffected === 0) {
                return res.status(404).json({ message: 'Échec de la mise à jour de l\'ingrédient.' });
            }

            res.json({ message: 'Ingrédient mis à jour avec succès.' });
        });
    });
});

module.exports = router;
