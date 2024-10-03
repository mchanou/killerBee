const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour mettre à jour un procédé par ID
router.put('/:id', (req, res) => {
    const procedeId = parseInt(req.params.id, 10);
    const { NomProcede, DescriptionProcede, ValidationTest } = req.body;

    // Vérification de la validité de l'ID
    if (isNaN(procedeId) || procedeId <= 0) {
        return res.status(400).json({ message: 'ID de procédé invalide.' });
    }

    // Validation des données
    if (!NomProcede || !DescriptionProcede || ValidationTest === undefined) {
        return res.status(400).json({ message: 'Les champs NomProcede, DescriptionProcede et ValidationTest sont obligatoires.' });
    }

    // Vérifier si le procédé existe
    const queryCheck = `SELECT * FROM dbo.Procede WHERE IdProcede = ?`;

    sql.query(connectionString, queryCheck, [procedeId], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la vérification du procédé : ", err);
            return res.status(500).json({ message: 'Erreur lors de la vérification du procédé.' });
        }

        // Vérification si le procédé n'existe pas
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Procédé non trouvé.' });
        }

        // Si le procédé existe, procéder à la mise à jour
        const queryUpdate = `UPDATE dbo.Procede SET NomProcede = ?, DescriptionProcede = ?, ValidationTest = ? WHERE IdProcede = ?`;
        const params = [NomProcede, DescriptionProcede, ValidationTest, procedeId];

        sql.query(connectionString, queryUpdate, params, (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour du procédé : ", err);
                return res.status(500).json({ message: 'Erreur lors de la mise à jour du procédé.' });
            }

            // Vérifier le nombre de lignes affectées
            if (result.rowsAffected === 0) {
                return res.status(404).json({ message: 'Échec de la mise à jour du procédé.' });
            }

            res.json({ message: 'Procédé mis à jour avec succès.' });
        });
    });
});

module.exports = router;
