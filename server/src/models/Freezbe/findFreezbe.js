const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour obtenir un Freezbe par nom avec ses ingrédients et grammage
router.get('/:name', (req, res) => {
    const freezbeName = req.params.name;

    // Validation du nom du Freezbe
    if (!freezbeName) {
        return res.status(400).json({ message: 'Le nom du Freezbe est obligatoire.' });
    }

    const query = `
        SELECT f.IdFreezbe, f.NomFreezbe, f.DescriptionFreezbe, f.PrixUHTFreezbe, f.GammeFreezbe,
               i.IdIngredient, i.NomIngredient, i.DescriptionIngredient, fi.Grammage
        FROM dbo.Freezbe f
        LEFT JOIN dbo.Freezbe_ingredient fi ON f.IdFreezbe = fi.IdFreezbe
        LEFT JOIN dbo.Ingredient i ON fi.IdIngredient = i.IdIngredient
        WHERE f.NomFreezbe = ?
    `;

    sql.query(connectionString, query, [freezbeName], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération du Freezbe et de ses ingrédients : ", err);
            return res.status(500).json({ message: 'Erreur lors de la récupération du Freezbe et de ses ingrédients.' });
        }

        // Vérifier si aucun Freezbe n'a été trouvé
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Freezbe non trouvé.' });
        }

        // Construire l'objet Freezbe avec ses ingrédients
        const freezbe = {
            IdFreezbe: rows[0].IdFreezbe,
            NomFreezbe: rows[0].NomFreezbe,
            DescriptionFreezbe: rows[0].DescriptionFreezbe,
            PrixUHTFreezbe: rows[0].PrixUHTFreezbe,
            GammeFreezbe: rows[0].GammeFreezbe,
            Ingredients: rows.map(row => ({
                IdIngredient: row.IdIngredient,
                NomIngredient: row.NomIngredient,
                DescriptionIngredient: row.DescriptionIngredient,
                Grammage: row.Grammage
            })).filter(ingredient => ingredient.IdIngredient !== null) // Remove null ingredients (if any)
        };

        res.json(freezbe);
    });
});

module.exports = router;
