const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour mettre à jour une relation Procédé-Étape
router.put('/:id', (req, res) => {
    const procedeEtapeId = parseInt(req.params.id, 10);
    const { IdProcede, IdEtape, NumEtape } = req.body;

    // Vérification de la validité de l'ID
    if (isNaN(procedeEtapeId) || procedeEtapeId <= 0) {
        return res.status(400).json({ message: 'ID de la relation Procédé-Étape invalide.' });
    }

    // Validation des données
    if (!IdProcede || !IdEtape || NumEtape === undefined) {
        return res.status(400).json({ message: 'Les champs IdProcede, IdEtape, et NumEtape sont obligatoires.' });
    }

    // Vérifier si la relation Procédé-Étape existe
    const queryCheck = `SELECT * FROM dbo.Procede_etape WHERE IdProcede = ? AND IdEtape = ?`;

    sql.query(connectionString, queryCheck, [IdProcede, IdEtape], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la vérification de la relation Procédé-Étape : ", err);
            return res.status(500).json({ message: 'Erreur lors de la vérification de la relation Procédé-Étape.' });
        }

        // Vérification si la relation n'existe pas
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Relation Procédé-Étape non trouvée.' });
        }

        // Si la relation existe, procéder à la mise à jour
        const queryUpdate = `UPDATE dbo.Procede_etape SET NumEtape = ? WHERE IdProcede = ? AND IdEtape = ?`;
        const params = [NumEtape, IdProcede, IdEtape];

        sql.query(connectionString, queryUpdate, params, (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour de la relation Procédé-Étape : ", err);
                return res.status(500).json({ message: 'Erreur lors de la mise à jour de la relation Procédé-Étape.' });
            }

            // Vérifier le nombre de lignes affectées
            // if (result.rowsAffected[0] === 0) {
            //     return res.status(404).json({ message: 'Échec de la mise à jour de la relation Procédé-Étape.' });
            // }

            res.json({ message: 'Relation Procédé-Étape mise à jour avec succès.' });
        });
    });
});

module.exports = router;

