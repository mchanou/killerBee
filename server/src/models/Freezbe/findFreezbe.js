const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour rechercher un Freezbe par nom
router.get('/:nom', (req, res) => {
    const nomFreezbe = req.params.nom;

    const query = `SELECT * FROM dbo.Freezbe WHERE NomFreezbe = ?`;

    sql.query(connectionString, query, [nomFreezbe], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération du Freezbe : ", err);
            return res.status(500).json({ message: 'Erreur lors de la récupération du Freezbe.' });
        }

        // Vérifier si aucun Freezbe n'a été trouvé
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Freezbe non trouvé.' });
        }

        // Retourner les détails du Freezbe trouvé
        res.json(rows[0]);
    });
});

module.exports = router;

