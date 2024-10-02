const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour obtenir tous les utilisateurs
router.get('/', (req, res) => {
    const query = `SELECT * FROM Utilisateur`;

    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération des utilisateurs : ", err);
            return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
        }
        res.json(rows);
    });
});

module.exports = router;