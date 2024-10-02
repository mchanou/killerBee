const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8'); 

// Route to remove an ingredient by ID
router.delete('/:id', (req, res) => {
    const ingredientId = parseInt(req.params.id, 10);

    // Validate the ID
    if (isNaN(ingredientId) || ingredientId <= 0) {
        return res.status(400).json({ message: 'ID d\'ingrédient invalide.' });
    }

    const query = `DELETE FROM Ingredient WHERE IdIngredient = ?`;

    sql.query(connectionString, query, [ingredientId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'ingrédient : ", err);
            return res.status(500).json({ message: 'Erreur lors de la suppression de l\'ingrédient.' });
        }

        // // Check if the ingredient was found and deleted
        // if (result.rowsAffected[0] === 0) {
        //     return res.status(404).json({ message: 'Ingrédient non trouvé.' });
        // }

        res.json({ message: 'Ingrédient supprimé avec succès.' });
    });
});

module.exports = router;

