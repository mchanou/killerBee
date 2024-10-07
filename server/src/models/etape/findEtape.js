const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour rechercher les étapes en fonction d'un procédé
router.get('/:id', (req, res) => {
    const procedeId = parseInt(req.params.id, 10);

    // Vérification de la validité de l'ID
    if (isNaN(procedeId) || procedeId <= 0) {
        return res.status(400).json({ message: 'ID du procédé invalide.' });
    }

    // Query to get steps linked to a specific procedure
    const query = `
        SELECT e.IdEtape, e.DescriptionEtape, pe.NumEtape
        FROM dbo.Etape e
        WHERE e.IdProcede = ?
        ORDER BY pe.NumEtape ASC`;

    sql.query(connectionString, query, [procedeId], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération des étapes : ", err);
            return res.status(500).json({ message: 'Erreur lors de la récupération des étapes.' });
        }

        // Vérifier si aucune étape n'a été trouvée
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Aucune étape trouvée pour ce procédé.' });
        }

        // Retourner les étapes trouvées
        res.json(rows);
    });
});

module.exports = router;
