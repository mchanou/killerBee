const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter un utilisateur
router.post('/', (req, res) => {
    let { PrenomUser, NomUser, EmailUser, LastConnexion, DateCreation } = req.body;

    // Validation des données
    if (!PrenomUser || !NomUser || !EmailUser) {
        return res.status(400).json({ message: 'Les champs PrenomUser, NomUser et EmailUser sont obligatoires.' });
    }

    // Vérification et conversion des dates si nécessaire
    try {
        if (LastConnexion) {
            LastConnexion = new Date(LastConnexion).toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
        } else {
            LastConnexion = new Date().toISOString().split('T')[0]; // Par défaut, aujourd'hui
        }

        if (DateCreation) {
            DateCreation = new Date(DateCreation).toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
        } else {
            DateCreation = new Date().toISOString().split('T')[0]; // Par défaut, aujourd'hui
        }
    } catch (error) {
        return res.status(400).json({ message: 'Format de date invalide.' });
    }

    const query = `INSERT INTO Utilisateur (PrenomUser, NomUser, EmailUser, LastConnexion, DateCreation) VALUES (?, ?, ?, ?, ?)`;
    const params = [PrenomUser, NomUser, EmailUser, LastConnexion, DateCreation];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de l'utilisateur : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur.' });
        }
        res.status(201).json({ message: 'Utilisateur ajouté avec succès.', userId: result.insertId });
    });
});

module.exports = router;
