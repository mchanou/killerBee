const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour supprimer une relation Freezbe-Ingredient
router.delete('/:idFreezbe/:idIngredient', (req, res) => {
    const IdFreezbe = parseInt(req.params.idFreezbe, 10);
    const IdIngredient = parseInt(req.params.idIngredient, 10);

    // Vérification de la validité des IDs
    if (isNaN(IdFreezbe) || IdFreezbe <= 0 || isNaN(IdIngredient) || IdIngredient <= 0) {
        return res.status(400).json({ message: 'IDs du Freezbe ou Ingredient invalides.' });
    }

    const query = `DELETE FROM dbo.Freezbe_ingredient WHERE IdFreezbe = ? AND IdIngredient = ?`;
    const params = [IdFreezbe, IdIngredient];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de la relation Freezbe-Ingredient : ", err);
            return res.status(500).json({ message: 'Erreur lors de la suppression de la relation Freezbe-Ingredient.' });
        }

        // Vérifier si la relation a été trouvée et supprimée
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Relation Freezbe-Ingredient non trouvée.' });
        }

        res.json({ message: 'Relation Freezbe-Ingredient supprimée avec succès.' });
    });
});

module.exports = router;

