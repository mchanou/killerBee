const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour rechercher un ingrédient par nom
router.get('/:nom', (req, res) => {
    const nomIngredient = req.params.nom;

    const query = `SELECT * FROM Ingredient WHERE NomIngredient = ?`;

    sql.query(connectionString, query, [nomIngredient], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération de l'ingrédient : ", err);
            return res.status(500).json({ message: 'Erreur lors de la récupération de l\'ingrédient.' });
        }

        // Vérifier si aucun ingrédient n'a été trouvé
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Ingrédient non trouvé.' });
        }

        // Retourner les détails de l'ingrédient trouvé
        res.json(rows[0]);
    });
});

module.exports = router;
