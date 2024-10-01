const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour mettre à jour un utilisateur par ID
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);

    // Vérification de la validité de l'ID
    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ message: 'ID utilisateur invalide.' });
    }

    const { prenom, nom, email, derniereConnexion, dateCreation } = req.body;

    // Validation des données
    if (!prenom || !nom || !email) {
        return res.status(400).json({ message: 'Les champs prenom, nom et email sont obligatoires.' });
    }

    // Vérification et conversion des dates si nécessaire
    let lastConnexion, creationDate;
    try {
        lastConnexion = new Date(derniereConnexion).toISOString().split('T')[0];
        creationDate = new Date(dateCreation).toISOString().split('T')[0];
    } catch (error) {
        return res.status(400).json({ message: 'Format de date invalide.' });
    }

    const query = `UPDATE Utilisateur SET PrenomUser = ?, NomUser = ?, EmailUser = ?, LastConnexion = ?, DateCreation = ? WHERE Id = ?`;
    const params = [prenom, nom, email, lastConnexion, creationDate, userId];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de l'utilisateur : ", err);
            return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
        }

        // Vérification si l'utilisateur a été trouvé et mis à jour
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.json({ message: 'Utilisateur mis à jour avec succès.' });
    });
});

module.exports = router;
