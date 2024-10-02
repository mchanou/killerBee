const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour rechercher un procédé par nom et description
router.get('/:nom', (req, res) => {
    const nomProcede = req.params.nom;
    const descriptionProcede = req.params.description;

    const query = `SELECT * FROM dbo.Procede WHERE NomProcede = ?`;

    sql.query(connectionString, query, [nomProcede], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération du procédé : ", err);
            return res.status(500).json({ message: 'Erreur lors de la récupération du procédé.' });
        }

        // Vérifier si aucun procédé n'a été trouvé
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Procédé non trouvé.' });
        }

        // Retourner les détails du procédé trouvé
        res.json(rows[0]);
    });
});

module.exports = router;

