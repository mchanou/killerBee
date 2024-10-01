const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route to edit user by ID
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { prenom, nom, email, derniereConnexion, dateCreation } = req.body;
    const query = `UPDATE Utilisateur SET PrenomUser = ?, NomUser = ?, EmailUser = ?, LastConnexion = ?, DateCreation = ? WHERE Id = ?`;
    const params = [prenom, nom, email, derniereConnexion, dateCreation, userId];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de l'utilisateur : ", err);
            return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
        }
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    });
});


module.exports = router;