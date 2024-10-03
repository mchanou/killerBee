const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour mettre à jour une Étape par ID
router.put('/:id', (req, res) => {
    const etapeId = parseInt(req.params.id, 10);
    const { DescriptionEtape } = req.body;

    // Vérification de la validité de l'ID
    if (isNaN(etapeId) || etapeId <= 0) {
        return res.status(400).json({ message: 'ID de l\'Étape invalide.' });
    }

    // Validation des données
    if (!DescriptionEtape) {
        return res.status(400).json({ message: 'Le champ DescriptionEtape est obligatoire.' });
    }

    // Vérifier si l'Étape existe
    const queryCheck = `SELECT * FROM dbo.Etape WHERE IdEtape = ?`;

    sql.query(connectionString, queryCheck, [etapeId], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la vérification de l'Étape : ", err);
            return res.status(500).json({ message: 'Erreur lors de la vérification de l\'Étape.' });
        }

        // Vérification si l'Étape n'existe pas
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Étape non trouvée.' });
        }

        // Si l'Étape existe, procéder à la mise à jour
        const queryUpdate = `UPDATE dbo.Etape SET DescriptionEtape = ? WHERE IdEtape = ?`;
        const params = [DescriptionEtape, etapeId];

        sql.query(connectionString, queryUpdate, params, (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour de l'Étape : ", err);
                return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'Étape.' });
            }

            // Vérifier le nombre de lignes affectées
            // if (result.rowsAffected[0] === 0) {
            //     return res.status(404).json({ message: 'Échec de la mise à jour de l\'Étape.' });
            // }

            res.json({ message: 'Étape mise à jour avec succès.' });
        });
    });
});

module.exports = router;
