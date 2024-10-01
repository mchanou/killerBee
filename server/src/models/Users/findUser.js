const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');


// Route to find user by ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const query = `SELECT * FROM Utilisateur WHERE Id = ?`;

    sql.query(connectionString, query, [userId], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération de l'utilisateur : ", err);
            return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(rows[0]);
    });
});

module.exports = router;