const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8'); 

// Route pour supprimer une Étape par ID
router.delete('/:id', (req, res) => {
    const etapeId = parseInt(req.params.id, 10);

    // Vérification de la validité de l'ID
    if (isNaN(etapeId) || etapeId <= 0) {
        return res.status(400).json({ message: 'ID de l\'Étape invalide.' });
    }

    const query = `DELETE FROM dbo.Etape WHERE IdEtape = ?`;

    sql.query(connectionString, query, [etapeId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'Étape : ", err);
            return res.status(500).json({ message: 'Erreur lors de la suppression de l\'Étape.' });
        }

        // Vérifier si l'Étape a été trouvée et supprimée
        // if (result.rowsAffected[0] === 0) {
        //     return res.status(404).json({ message: 'Étape non trouvée.' });
        // }

        res.json({ message: 'Étape supprimée avec succès.' });
    });
});

module.exports = router;

