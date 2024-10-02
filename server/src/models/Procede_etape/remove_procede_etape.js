const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8'); 

// Route pour supprimer une relation Procédé-Étape
router.delete('/:procedeId/:etapeId', (req, res) => {
    const procedeId = parseInt(req.params.procedeId, 10);
    const etapeId = parseInt(req.params.etapeId, 10);

    // Vérification de la validité des IDs
    if (isNaN(procedeId) || procedeId <= 0 || isNaN(etapeId) || etapeId <= 0) {
        return res.status(400).json({ message: 'IDs du Procédé ou Étape invalide.' });
    }

    const query = `DELETE FROM dbo.Procede_etape WHERE IdProcede = ? AND IdEtape = ?`;

    sql.query(connectionString, query, [procedeId, etapeId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de la relation Procédé-Étape : ", err);
            return res.status(500).json({ message: 'Erreur lors de la suppression de la relation Procédé-Étape.' });
        }

        // Vérifier si la relation a été trouvée et supprimée
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Relation Procédé-Étape non trouvée.' });
        }

        res.json({ message: 'Relation Procédé-Étape supprimée avec succès.' });
    });
});

module.exports = router;

