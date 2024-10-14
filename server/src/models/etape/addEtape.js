const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter une Étape
router.post('/', (req, res) => {
    const stepList = req.body;

    // Validation des données
    if (!Array.isArray(stepList)) {
        return res.status(400).json({ message: 'Format de données invalide.'});
    }
    
    const query = `INSERT INTO Etape (NomEtape, DescriptionEtapen NumEtape, IdProcede) VALUES (?)`;
    const params = stepList.map(obj => [obj.stepName, obj.stepDesc, obj.stepNumber, obj.IdProcede]);

    sql.query(connectionString, query, params, (err) => {
        if (err) {
            console.error("Erreur lors de l'insertion de l'Étape : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'Étape.' });
        }
        res.status(200).json({ message: 'Étape ajoutée avec succès.'});
    });
});

module.exports = router;
