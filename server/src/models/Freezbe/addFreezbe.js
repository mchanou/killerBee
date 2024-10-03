const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter un Freezbe
router.post('/', (req, res) => {
    let { NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe, GammeFreezbe } = req.body;

    // Validation des données
    if (!NomFreezbe || !DescriptionFreezbe || PrixUHTFreezbe === undefined || !GammeFreezbe) {
        return res.status(400).json({ message: 'Les champs NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe et GammeFreezbe sont obligatoires.' });
    }
    
    const query = `INSERT INTO dbo.Freezbe (NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe, GammeFreezbe) VALUES (?, ?, ?, ?)`;
    const params = [NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe, GammeFreezbe];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion du Freezbe : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du Freezbe.' });
        }
        res.status(201).json({ message: 'Freezbe ajouté avec succès.', freezbeId: result.insertId });
    });
});

module.exports = router;

