const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter un utilisateur
router.post('/', (req, res) => {
    let { NomProcede, DescriptionProcede, ValidationTest } = req.body;

    // Validation des données
    if (!NomProcede || !DescriptionProcede || !ValidationTest) {
        return res.status(400).json({ message: 'Les champs NomProcede, DescriptionProcede et ValidationTest sont obligatoires.' });
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

