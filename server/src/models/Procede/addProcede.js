const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter un procédé
router.post('/', (req, res) => {
    let { NomProcede, DescriptionProcede, ValidationTest } = req.body;

    // Validation des données
    if (!NomProcede || !DescriptionProcede || ValidationTest === undefined) {
        return res.status(400).json({ message: 'Les champs NomProcede, DescriptionProcede et ValidationTest sont obligatoires.' });
    }
    
    const query = `INSERT INTO dbo.Procede (NomProcede, DescriptionProcede, ValidationTest) VALUES (?, ?, ?)`;
    const params = [NomProcede, DescriptionProcede, ValidationTest];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion du procédé : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du procédé.' });
        }
        res.status(201).json({ message: 'Procédé ajouté avec succès.', procedeId: result.insertId });
    });
});

module.exports = router;