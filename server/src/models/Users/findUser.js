const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour rechercher un utilisateur par nom et prénom
router.get('/:prenom/:nom', (req, res) => {
    const prenomUser = req.params.prenom;
    const nomUser = req.params.nom;

    const query = `SELECT * FROM Utilisateur WHERE PrenomUser = ? AND NomUser = ?`;

    sql.query(connectionString, query, [prenomUser, nomUser], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération de l'utilisateur : ", err);
            return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
        }

        // Vérifier si aucun utilisateur n'a été trouvé
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Retourner les détails de l'utilisateur trouvé
        res.json(rows[0]);
    });
});

module.exports = router;
