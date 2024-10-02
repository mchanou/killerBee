const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter une Étape
router.post('/', (req, res) => {
    let { DescriptionEtape } = req.body;

    // Validation des données
    if (!DescriptionEtape) {
        return res.status(400).json({ message: 'Le champ DescriptionEtape est obligatoire.' });
    }
    
    const query = `INSERT INTO Etape (DescriptionEtape) VALUES (?)`;
    const params = [DescriptionEtape];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de l'Étape : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'Étape.' });
        }
        res.status(201).json({ message: 'Étape ajoutée avec succès.', etapeId: result.insertId });
    });
});

module.exports = router;
