const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');


// Route to add user by ID
router.post('/', (req, res) => {
    let { PrenomUser, NomUser, EmailUser, LastConnexion, DateCreation } = req.body;

    // Vérification et conversion des types
    if (!PrenomUser || !NomUser || !EmailUser) {
        return res.status(400).json({ message: 'Les champs PrenomUser, NomUser et EmailUser sont obligatoires.' });
    }

    // Convertir les dates en chaîne si elles ne sont pas déjà dans le bon format
    LastConnexion = new Date(LastConnexion).toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
    DateCreation = new Date(DateCreation).toISOString().split('T')[0]; // Format 'YYYY-MM-DD'

    const query = `INSERT INTO Utilisateur (PrenomUser, NomUser, EmailUser, LastConnexion, DateCreation) VALUES (?, ?, ?, ?, ?)`;
    const params = [PrenomUser, NomUser, EmailUser, LastConnexion, DateCreation];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de l'utilisateur : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
        }
        res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
    });
});




module.exports = router;