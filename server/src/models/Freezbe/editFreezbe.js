const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour mettre à jour un Freezbe par ID
router.put('/:id', (req, res) => {
    const freezbeId = parseInt(req.params.id, 10);
    const { NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe, GammeFreezbe } = req.body;

    // Vérification de la validité de l'ID
    if (isNaN(freezbeId) || freezbeId <= 0) {
        return res.status(400).json({ message: 'ID de Freezbe invalide.' });
    }

    // Validation des données
    if (!NomFreezbe || !DescriptionFreezbe || PrixUHTFreezbe === undefined || !GammeFreezbe) {
        return res.status(400).json({ message: 'Les champs NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe et GammeFreezbe sont obligatoires.' });
    }

    // Vérifier si le Freezbe existe
    const queryCheck = `SELECT * FROM dbo.Freezbe WHERE IdFreezbe = ?`;

    sql.query(connectionString, queryCheck, [freezbeId], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la vérification du Freezbe : ", err);
            return res.status(500).json({ message: 'Erreur lors de la vérification du Freezbe.' });
        }

        // Vérification si le Freezbe n'existe pas
        // if (!rows || rows.length === 0) {
        //     return res.status(404).json({ message: 'Freezbe non trouvé.' });
        // }

        // Si le Freezbe existe, procéder à la mise à jour
        const queryUpdate = `UPDATE dbo.Freezbe SET NomFreezbe = ?, DescriptionFreezbe = ?, PrixUHTFreezbe = ?, GammeFreezbe = ? WHERE IdFreezbe = ?`;
        const params = [NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe, GammeFreezbe, freezbeId];

        sql.query(connectionString, queryUpdate, params, (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour du Freezbe : ", err);
                return res.status(500).json({ message: 'Erreur lors de la mise à jour du Freezbe.' });
            }

            // Vérifier le nombre de lignes affectées
            // if (result.rowsAffected[0] === 0) {
            //     return res.status(404).json({ message: 'Échec de la mise à jour du Freezbe.' });
            // }

            res.json({ message: 'Freezbe mis à jour avec succès.' });
        });
    });
});

module.exports = router;

